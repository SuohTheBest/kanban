import { Inject, Middleware } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { JwtPayload } from '../interface';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  @Inject()
  userService: UserService;

  resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      const unprotectedPaths = [
        '/api',
        '/api/user/login',
        '/api/user/register',
        '/api/user/reset-validate',
        '/api/user/verifyToken',
      ];
      if (unprotectedPaths.includes(ctx.path) || ctx.method === 'OPTIONS') {
        await next();
        return;
      }
      const token = ctx.cookies.get('token');
      if (!token) {
        ctx.status = 401;
        ctx.body = { message: 'Not logged in.' };
        return;
      }

      try {
        const decoded_token = (await this.jwtService.verify(
          token
        )) as unknown as JwtPayload;
        console.log(decoded_token);
        const user = await this.userService.getUserById(decoded_token.user_id);
        console.log(user);
        if (decoded_token.login_time !== user.login_time) {
          ctx.status = 401;
          ctx.body = { message: 'Old Token.' };
        } else {
          ctx.state.user = user;
          await next();
        }
      } catch (err) {
        console.log(err);
        ctx.status = 401;
        ctx.body = { message: 'Invalid Token.' };
      }
    };
  }
}

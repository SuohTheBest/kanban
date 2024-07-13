import {Inject, Middleware} from '@midwayjs/core';
import {JwtService} from '@midwayjs/jwt';
import {Context} from '@midwayjs/koa';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      const unprotectedPaths = [
        '/api',
        '/api/user/login',
        '/api/user/register',
        '/api/user/reset-validate',
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
        ctx.state.user = await this.jwtService.verify(token);
        await next();
      } catch (err) {
        console.log(err);
        ctx.status = 401;
        ctx.body = { message: 'Invalid Token.' };
      }
    };
  }
}

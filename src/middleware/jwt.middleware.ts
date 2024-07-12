import {Inject, Middleware} from '@midwayjs/core';
import {JwtService} from '@midwayjs/jwt';
import {Context} from '@midwayjs/koa';

@Middleware()
export class JwtMiddleware {

  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      const unprotectedPaths = ['/api','/api/user/login', '/api/user/register'];
      if (unprotectedPaths.includes(ctx.path)) {
        await next();
        return;
      }
      const token = ctx.cookies.get('token');
      if (!token) {
        ctx.status = 401;
        ctx.body = {message: 'Not logged in.'};
        return;
      }

      try {
        const decoded = await this.jwtService.verify(token);
        ctx.state.user = decoded;
        await next();
      } catch (err) {
        ctx.status = 401;
        ctx.body = {message: 'Invalid Token.'};
      }
    };
  }
}

import { UserService } from '../service/user.service';
import {
  Body,
  Controller,
  Inject,
  Options,
  Post,
  Provide,
} from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  jwtService: JwtService;

  @Inject()
  ctx: Context;

  @Options('/*')
  async optionsHandler() {
    this.ctx.status = 204;
    const request_origin = this.ctx.request.headers.origin;
    this.ctx.set('Access-Control-Allow-Origin', request_origin);
    this.ctx.set(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    );
    this.ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  @Post('/register')
  async register(
    @Body() body: { username: string; password: string; email: string }
  ) {
    const { username, password, email } = body;
    try {
      await this.userService.register(username, password, email);
      return { success: true };
    } catch (error) {
      console.log('error');
      return { success: false, message: error.message };
    }
  }

  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const userId = await this.userService.getUserId(username, password);
    if (userId !== -1) {
      const token = await this.jwtService.sign({ userId });
      this.ctx.cookies.set('token', token, { httpOnly: true }); // 设置 HTTP-only cookie
      return { success: true };
    }
    return { success: false };
  }

  @Post('/reset-validate')
  async reset_validate(@Body() body: { username: string; email: string }) {
    const { username, email } = body;
    const userId = await this.userService.getUserIdViaEmail(username, email);
    if (userId !== -1) {
      const token = await this.jwtService.sign({ userId });
      this.ctx.cookies.set('token', token, { httpOnly: true });
      return { success: true };
    }
    return { success: false };
  }

  @Post('/reset-password')
  async reset_password(@Body() body: { password: string }) {
    const { password } = body;
    const userId = this.ctx.state.user.userId;
    const result = await this.userService.setNewPassword(userId, password);
    return { success: result };
  }

  @Post('/protected')
  async protected() {
    const token = this.ctx.cookies.get('token');
    if (!token) {
      return { success: false, errcode: 401 };
    }
    try {
      const decoded = await this.jwtService.verify(token);
      return { success: true, value: decoded };
    } catch (err) {
      return { success: false, errcode: 404 };
    }
  }
}

import { UserService } from '../service/user.service';
import { Body, Controller, Inject, Post, Provide } from '@midwayjs/core';
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
    } else {
      return { success: false };
    }
  }

  @Post('/protected')
  async protected() {
    const token = this.ctx.cookies.get('token');
    if (!token) {
      return { successful: false, errcode: 401 };
    }

    try {
      const decoded = await this.jwtService.verify(token);
      return { successful: true, value: decoded };
    } catch (err) {
      return { successful: false, errcode: 404 };
    }
  }
}

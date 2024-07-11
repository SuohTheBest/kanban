import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Body, Controller, Inject, Post, Provide } from '@midwayjs/core';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(
    @Body() body: { username: string; password: string; email: string },
    ctx: Context
  ): Promise<void> {
    const { username, password, email } = body;
    const user = await this.userService.register(username, password, email);
    ctx.body = { success: true, user };
  }
}

import { UserService } from '../service/user.service';
import { Body, Controller, Inject, Post, Provide } from '@midwayjs/core';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

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
    const isValid = await this.userService.validateUser(username, password);
    if (isValid) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
}

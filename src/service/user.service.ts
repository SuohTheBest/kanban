import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<User> {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password; // Note: In a real-world application, make sure to hash the password before saving it.
    newUser.email = email;
    return await this.userModel.save(newUser);
  }
}

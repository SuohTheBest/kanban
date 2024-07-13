import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userRepository: Repository<User>;

  async hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
  }

  async getUserId(username: string, password: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      return -1;
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return -1;
    }
    return user.id;
  }

  async getUserIdViaEmail(username: string, email: string): Promise<number> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      return -1;
    }
    return user.username === username ? user.id : -1;
  }

  async setNewPassword(userid: number, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userid });
    if (!user) {
      return false;
    }
    try {
      const hashedPassword = await this.hashPassword(newPassword);
      await this.userRepository.update(user, { password: hashedPassword });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<User> {
    const newUser = new User();
    const hashedPassword = await this.hashPassword(password);
    console.log('Hashed password:', hashedPassword);
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.email = email;
    try {
      console.log('Saving user to the database...');
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log('Error saving user:', error);
      if (error.code === 'SQLITE_CONSTRAINT') {
        if (error.message.includes('UNIQUE constraint failed: User.email')) {
          throw new Error('邮箱已存在');
        }
      }
      throw error;
    }
  }
}

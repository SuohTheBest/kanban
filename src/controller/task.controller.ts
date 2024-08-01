import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TaskService } from '../service/task.service';
import { JwtService } from '@midwayjs/jwt';
import { User } from '../entity/User';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';

// 后端的task对应前端的project，发现的时候已经为时已晚，我懒得改了😇
@Controller('/task')
export class TaskController {
  @Inject()
  ctx: Context;

  @Inject()
  taskService: TaskService;

  @Inject()
  jwtService: JwtService;

  @Inject()
  projectService: ProjectService;

  @Inject()
  userService: UserService;

  @Get('/')
  async getAllTasks() {
    try {
      const user = this.ctx.state.user as User;
      const created_tasks = await this.taskService.getTaskByUserId(user.id);
      const involved_tasks = await this.taskService.getTasks(user.collaborate);
      const real_created_tasks = created_tasks.map(task => {
        return { ...task, type: 0 };
      });
      const real_involved_tasks = involved_tasks.map(task => {
        return { ...task, type: 1 };
      });
      this.ctx.body = {
        success: true,
        value: real_created_tasks.concat(real_involved_tasks),
      };
    } catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  @Del('/')
  async deleteTask(@Query('task_id') task_id: number) {
    try {
      const user = this.ctx.state.user as User;
      await this.taskService.ensureValidTaskId(task_id, user, true);
      await this.taskService.deleteTask(task_id);
      await this.projectService.deleteProjectByTaskId(task_id);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  @Post('/')
  async addTask(@Body() body: { name: string }) {
    try {
      const user_id = this.ctx.state.user.id;
      const { name } = body;
      const task = await this.taskService.addTask(name, user_id);
      return { success: true, value: task };
    } catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  @Post('/collaborate')
  async addCollaborate(@Body() body: { email: string; task_id: number }) {
    try {
      const { email, task_id } = body;
      const user = this.ctx.state.user as User;
      await this.taskService.ensureValidTaskId(task_id, user, true);
      await this.userService.addCollaborate(email, task_id, user);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }
}

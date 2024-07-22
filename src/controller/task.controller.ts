import { Body, Controller, Get, Inject, Param, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TaskService } from '../service/task.service';
import { JwtService } from '@midwayjs/jwt';
import { User } from '../entity/User';
import { ProjectService } from '../service/project.service';

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

  @Get('/')
  async getAllTasks() {
    try {
      const user = this.ctx.state.user as User;
      const tasks = await this.taskService.getTaskById(user.id);
      this.ctx.body = { success: true, value: tasks };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Post('/')
  async addTask(@Body() body: { name: string }) {
    try {
      const userId = this.ctx.state.user.userId;
      const { name } = body;
      const task = await this.taskService.addTask(name, userId);
      return { success: true, value: task };
    } catch (err) {
      return { success: false };
    }
  }

  @Get('/:task_id')
  async getAllProject(@Param('task_id') task_id: number) {
    try {
      const projects = await this.projectService.getProjectsById(task_id);
      return { success: true, value: projects };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

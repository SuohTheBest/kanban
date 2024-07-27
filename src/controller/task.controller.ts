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

  async ensureValidTaskId(task_id: number) {
    const user_id = this.ctx.state.user.id;
    if (!(await this.taskService.checkTaskValid(user_id, task_id))) {
      return { success: false };
    }
  }

  @Get('/')
  async getAllTasks() {
    try {
      const user = this.ctx.state.user as User;
      const tasks = await this.taskService.getTaskByUserId(user.id);
      this.ctx.body = { success: true, value: tasks };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Del('/')
  async deleteTask(@Query('task_id') task_id: number) {
    try {
      await this.taskService.deleteTask(task_id);
      await this.projectService.deleteProjectByTaskId(task_id);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
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
      return { success: false };
    }
  }

  @Post('/project')
  async addProject(
    @Body()
    body: {
      name: string;
      start_date: Date;
      end_date: Date;
      description: string;
      type: number;
      task_id: number;
    }
  ) {
    try {
      const { name, start_date, end_date, description, type, task_id } = body;
      await this.ensureValidTaskId(task_id);
      const newProject = await this.projectService.addProject(
        name,
        start_date,
        end_date,
        description,
        type,
        task_id
      );
      return { success: true, value: newProject };
    } catch (err) {
      console.log(err);
      return { success: false, value: err.message };
    }
  }

  @Get('/project')
  async getAllProject(@Query('task_id') task_id: number) {
    try {
      await this.ensureValidTaskId(task_id);
      const projects = await this.projectService.getProjectsById(task_id);
      return { success: true, value: projects };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

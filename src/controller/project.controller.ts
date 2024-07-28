import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TaskService } from '../service/task.service';
import { JwtService } from '@midwayjs/jwt';
import { ProjectService } from '../service/project.service';
import { ProjectData } from '../interface';

@Controller('/project')
export class ProjectController {
  @Inject()
  ctx: Context;

  @Inject()
  taskService: TaskService;

  @Inject()
  jwtService: JwtService;

  @Inject()
  projectService: ProjectService;

  @Post('/')
  async addProject(@Body() body: ProjectData) {
    try {
      const { task_id } = body;
      const user_id = this.ctx.state.user.id;
      await this.taskService.ensureValidTaskId(task_id, user_id);
      const newProject = await this.projectService.addProject(body);
      return { success: true, value: newProject };
    } catch (err) {
      console.log(err);
      return { success: false, value: err.message };
    }
  }

  @Get('/')
  async getAllProject(@Query('task_id') task_id: number) {
    try {
      const user_id = this.ctx.state.user.id;
      await this.taskService.ensureValidTaskId(task_id, user_id);
      const projects = await this.projectService.getProjectsById(task_id);
      return { success: true, value: projects };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

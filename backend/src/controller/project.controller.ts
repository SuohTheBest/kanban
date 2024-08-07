import {
  Body,
  Controller,
  Del,
  Fields,
  Files,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { TaskService } from '../service/task.service';
import { JwtService } from '@midwayjs/jwt';
import { ProjectService } from '../service/project.service';
import { ProjectData } from '../interface';
import { join } from 'path';
import * as fs from 'node:fs';
import { readFileSync } from 'fs';
import { existsSync } from 'node:fs';
import { User } from '../entity/User';
import { Project } from '../entity/Project';

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
      const user = this.ctx.state.user as User;
      await this.taskService.ensureValidTaskId(task_id, user, false);
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
      const user = this.ctx.state.user as User;
      await this.taskService.ensureValidTaskId(task_id, user, false);
      const projects = await this.projectService.getProjectsByTaskId(task_id);
      return { success: true, value: projects };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Del('/')
  async deleteProject(@Query('project_id') project_id: number) {
    try {
      const user = this.ctx.state.user as User;
      const project = await this.projectService.getProjectById(project_id);
      await this.taskService.ensureValidTaskId(project.task_id, user, false);
      await this.projectService.deleteProjectById(project_id);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, value: err.message };
    }
  }

  @Put('/')
  async updateProject(@Body() body: Project) {
    try {
      const user = this.ctx.state.user as User;
      const old_project = await this.projectService.getProjectById(body.id);
      const task_id = old_project.task_id;
      await this.taskService.ensureValidTaskId(task_id, user, false);
      await this.projectService.updateProject(body);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    if (!files || files.length === 0) {
      this.ctx.throw(400, 'no files provided');
    }
    try {
      const uploadDir = this.ctx.app.getConfig('upload.baseDir');
      const file = files[0];
      const project_id = fields.task_id as number;
      const project = await this.projectService.getProjectById(project_id);
      const user = this.ctx.state.user;
      await this.taskService.ensureValidTaskId(project.task_id, user, false);
      const fileName = file.filename;
      const filePath = file.data;
      const targetPath = join(
        uploadDir,
        project_id.toString() + '-' + fileName
      );
      const record = await this.projectService.recordUploadFile(
        fileName,
        targetPath,
        project_id
      );
      fs.copyFileSync(filePath, targetPath);
      console.log(record);
      return {
        success: true,
        value: file.filename,
      };
    } catch (err) {
      console.log(err);
      return { success: false, value: err.message };
    }
  }

  @Get('/upload')
  async getAllUpload(@Query('project_id') project_id: number) {
    try {
      const allUploads = await this.projectService.getUploadFilesByProjectId(
        project_id
      );
      const response = allUploads.map(({ id, file_name }) => ({
        id,
        file_name,
      }));
      return { success: true, value: response };
    } catch (err) {
      console.log(err);
      return { success: false, value: err.message };
    }
  }

  @Del('/upload')
  async deleteFile(@Query('file_id') id: number) {
    try {
      const user = this.ctx.state.user as User;
      const file = await this.projectService.getUploadFileById(id);
      const project_id = file.project_id;
      const project = await this.projectService.getProjectById(project_id);
      await this.taskService.ensureValidTaskId(project.task_id, user, false);
      await this.projectService.deleteUploadFile(file);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, value: err.message };
    }
  }

  @Get('/download')
  async downloadFile(
    @Query('file_name') file_name: string,
    @Query('project_id') project_id: number
  ) {
    try {
      const user = this.ctx.state.user as User;
      const project = await this.projectService.getProjectById(project_id);
      await this.taskService.ensureValidTaskId(project.task_id, user, false);
      const uploadDir = this.ctx.app.getConfig('upload.baseDir');
      const filePath = join(uploadDir, project_id.toString() + '-' + file_name);
      if (!existsSync(filePath)) {
        this.ctx.status = 404;
        this.ctx.body = 'File not found';
        return;
      }
      this.ctx.attachment(file_name);
      this.ctx.body = readFileSync(filePath);
    } catch (err) {
      console.log(err);
      this.ctx.status = 500;
    }
  }

  @Get('/comment')
  async getComments(@Query('project_id') project_id: number) {
    try {
      const user = this.ctx.state.user as User;
      const project = await this.projectService.getProjectById(project_id);
      await this.taskService.ensureValidTaskId(project.task_id, user, false);
      const comments = await this.projectService.getCommentsByProjectId(
        project_id
      );
      return { success: true, value: comments };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Post('/comment')
  async addComment(@Body() body: { message: string; project_id: number }) {
    try {
      const username = this.ctx.state.user.username;
      const { message, project_id } = body;
      const comment = await this.projectService.addComment(
        username,
        message,
        project_id
      );
      return { success: true, value: comment };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }

  @Del('/comment')
  async deleteComment(@Query('comment_id') id: number) {
    try {
      const user = this.ctx.state.user;
      const comment = await this.projectService.getCommentById(id);
      if (comment.username !== user.username) {
        return { success: false };
      }
      const project = await this.projectService.getProjectById(
        comment.project_id
      );
      await this.taskService.ensureValidTaskId(project.task_id, user, false);
      await this.projectService.deleteCommentById(id);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
}

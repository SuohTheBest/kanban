import {
  Body,
  Controller,
  Del,
  Fields,
  Files,
  Get,
  Inject,
  Post,
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
      const projects = await this.projectService.getProjectsByTaskId(task_id);
      return { success: true, value: projects };
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
      const user_id = this.ctx.state.user_id;
      await this.taskService.ensureValidTaskId(project.task_id, user_id);
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
      const user_id = this.ctx.state.user_id;
      const file = await this.projectService.getUploadFileById(id);
      const project_id = file.project_id;
      const project = await this.projectService.getProjectById(project_id);
      await this.taskService.ensureValidTaskId(project.task_id, user_id);
      const file_name = file.file_name;
      const upload_dir = this.ctx.app.getConfig('upload.baseDir');
      const file_path = join(
        upload_dir,
        project_id.toString() + '-' + file_name
      );
      fs.unlinkSync(file_path);
      await this.projectService.deleteUploadFileById(id);
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
      const user_id = this.ctx.state.user_id;
      await this.taskService.ensureValidTaskId(project_id, user_id);
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
}

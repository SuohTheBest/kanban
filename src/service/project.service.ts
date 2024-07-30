import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Project } from '../entity/Project';
import { Repository } from 'typeorm';
import { ProjectData } from '../interface';
import { UploadFile } from '../entity/UploadFile';
import { Comments } from '../entity/Comments';

@Provide()
export class ProjectService {
  @InjectEntityModel(Project)
  projectRepository: Repository<Project>;

  @InjectEntityModel(UploadFile)
  uploadFileRepository: Repository<UploadFile>;

  @InjectEntityModel(Comments)
  commentRepository: Repository<Comments>;

  async getProjectsByTaskId(task_id: number): Promise<Project[]> {
    return this.projectRepository.findBy({ task_id: task_id });
  }

  async getProjectById(project_id: number): Promise<Project> {
    return this.projectRepository.findOneBy({ id: project_id });
  }

  async addProject(project_data: ProjectData): Promise<Project> {
    const newProject = this.projectRepository.create(project_data);
    return this.projectRepository.save(newProject);
  }

  async deleteProjectByTaskId(task_id: number): Promise<void> {
    const projects = await this.getProjectsByTaskId(task_id);
    await this.projectRepository.remove(projects);
  }

  async deleteProjectById(project_id: number): Promise<void> {
    const project = await this.getProjectById(project_id);
    await this.projectRepository.remove(project);
  }

  async recordUploadFile(
    file_name: string,
    file_path: string,
    project_id: number
  ): Promise<UploadFile> {
    const newUploadFile: UploadFile = this.uploadFileRepository.create({
      file_name,
      file_path,
      project_id,
    });
    return this.uploadFileRepository.save(newUploadFile);
  }

  async getUploadFilesByProjectId(project_id: number): Promise<UploadFile[]> {
    return this.uploadFileRepository.findBy({ project_id: project_id });
  }

  async getUploadFileById(file_id: number): Promise<UploadFile> {
    return this.uploadFileRepository.findOneBy({ id: file_id });
  }

  async deleteUploadFileById(file_id: number): Promise<void> {
    const uploadFile = await this.getUploadFileById(file_id);
    await this.uploadFileRepository.remove(uploadFile);
  }

  async addComment(
    username: string,
    message: string,
    project_id: number
  ): Promise<Comments> {
    const newComment = this.commentRepository.create({
      username,
      message,
      project_id,
    });
    newComment.timestamp = Date.now();
    return await this.commentRepository.save(newComment);
  }

  async getCommentById(comment_id: number): Promise<Comments> {
    return this.commentRepository.findOneBy({ id: comment_id });
  }

  async getCommentsByProjectId(project_id: number): Promise<Comments[]> {
    return this.commentRepository.findBy({ project_id: project_id });
  }

  async deleteCommentById(comment_id: number): Promise<void> {
    const comment = await this.getCommentById(comment_id);
    await this.commentRepository.remove(comment);
  }
}

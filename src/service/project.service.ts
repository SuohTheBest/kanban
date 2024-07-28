import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Project } from '../entity/Project';
import { Repository } from 'typeorm';
import { ProjectData } from '../interface';

@Provide()
export class ProjectService {
  @InjectEntityModel(Project)
  projectRepository: Repository<Project>;

  async getProjectsById(task_id: number): Promise<Project[]> {
    return this.projectRepository.find({ where: { task_id: task_id } });
  }

  async addProject(project_data: ProjectData): Promise<Project> {
    const newProject = this.projectRepository.create(project_data);
    return this.projectRepository.save(newProject);
  }

  async deleteProjectByTaskId(task_id: number): Promise<void> {
    const projects = await this.projectRepository.findBy({ task_id: task_id });
    await this.projectRepository.remove(projects);
  }

  async deleteProjectById(project_id: number): Promise<void> {
    const project = await this.projectRepository.findBy({ id: project_id });
    await this.projectRepository.remove(project);
  }
}

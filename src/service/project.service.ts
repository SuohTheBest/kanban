import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Project } from '../entity/Project';
import { Repository } from 'typeorm';

@Provide()
export class ProjectService {
  @InjectEntityModel(Project)
  projectRepository: Repository<Project>;

  async getProjectsById(task_id: number): Promise<Project[]> {
    return this.projectRepository.find({ where: { task_id: task_id } });
  }

  async addProject(
    name: string,
    start_date: Date,
    end_date: Date,
    description: string,
    type: number,
    task_id: number
  ): Promise<Project> {
    const newProject = new Project();
    newProject.name = name;
    newProject.start_date = start_date;
    newProject.end_date = end_date;
    newProject.description = description;
    newProject.type = type;
    newProject.task_id = task_id;
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

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
}

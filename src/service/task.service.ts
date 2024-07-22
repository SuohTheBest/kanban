import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/Task';

@Provide()
export class TaskService {
  @InjectEntityModel(Task)
  taskRepository: Repository<Task>;

  async getTaskById(user_id: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user_id: user_id } });
  }

  async addTask(name: string, user_id: number): Promise<Task> {
    const newTask = new Task();
    newTask.user_id = user_id;
    newTask.name = name;
    return await this.taskRepository.save(newTask);
  }
}

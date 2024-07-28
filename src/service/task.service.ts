import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/Task';

@Provide()
export class TaskService {
  @InjectEntityModel(Task)
  taskRepository: Repository<Task>;

  async ensureValidTaskId(task_id: number, user_id: number) {
    if (!(await this.checkTaskValid(user_id, task_id))) {
      return { success: false };
    }
  }

  async getTaskByUserId(user_id: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user_id: user_id } });
  }

  async addTask(name: string, user_id: number): Promise<Task> {
    const newTask = new Task();
    newTask.user_id = user_id;
    newTask.name = name;
    return await this.taskRepository.save(newTask);
  }

  async deleteTask(task_id: number): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id: task_id });
    await this.taskRepository.remove(task);
  }

  async checkTaskValid(user_id: number, task_id: number): Promise<boolean> {
    try {
      const task = await this.taskRepository.findOneBy({ id: task_id });
      return !(!task || task.user_id !== user_id);
    } catch (err) {
      return false;
    }
  }
}

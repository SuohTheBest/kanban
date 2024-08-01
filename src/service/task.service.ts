import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/Task';
import { User } from '../entity/User';

@Provide()
export class TaskService {
  @InjectEntityModel(Task)
  taskRepository: Repository<Task>;

  async ensureValidTaskId(task_id: number, user: User, strict: boolean) {
    const user_id = user.id;
    if (!(await this.checkTaskValid(user_id, task_id))) {
      if (strict || user.collaborate === null) throw Error('Task id not valid');
      for (const involve_id of user.collaborate) {
        if (Number(involve_id) === task_id) return;
      }
      throw Error('Task id not valid');
    }
  }

  async getTasks(task_ids: number[]): Promise<Task[]> {
    if (task_ids === null || task_ids.length === 0) return [];
    const tasks = [] as Task[];
    for (const id of task_ids) {
      tasks.push(await this.getTask(id));
    }
    return tasks;
  }

  async getTask(task_id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id: task_id });
  }

  async getTaskByUserId(user_id: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user_id: user_id } });
  }

  async addTask(name: string, user_id: number): Promise<Task> {
    const newTask = new Task();
    newTask.user_id = user_id;
    newTask.name = name;
    return this.taskRepository.save(newTask);
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

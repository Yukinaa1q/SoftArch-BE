// src/services/task.service.ts
import { Injectable } from '@nestjs/common';
import { Task } from '../model/task.model';
import { MockDataRepository } from '../repository/mock-data.repository';

@Injectable()
export class TaskService {
  constructor(private readonly mockRepository: MockDataRepository) {}

  getAllTasks(): Task[] {
    return this.mockRepository.getAllTasks();
  }

  getTasksByStaffId(staffId: number): Task[] {
    return this.mockRepository.getTasksByStaffId(staffId);
  }

  createTask(taskDto: Omit<Task, 'id'>): Task {
    return this.mockRepository.addTask({
      ...taskDto,
      status: taskDto.status || 'Pending',
    });
  }

  updateTaskStatus(
    taskId: number,
    status: 'Pending' | 'In Progress' | 'Completed',
  ): Task | undefined {
    return this.mockRepository.updateTaskStatus(taskId, status);
  }

  getTasksByStaffIdAndDate(staffId: number, date: string): Task[] {
    return this.mockRepository.getTasksByStaffIdAndDate(staffId, date);
  }

  getTasksByDate(date: string): Task[] {
    return this.mockRepository.getTasksByDate(date);
  }
}

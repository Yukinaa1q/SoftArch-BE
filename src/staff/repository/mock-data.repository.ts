// src/repositories/mock-data.repository.ts
import { Injectable } from '@nestjs/common';
import { Task } from '../model/task.model';

@Injectable()
export class MockDataRepository {
  private tasks: Task[] = [
    new Task(
      1,
      1,
      'Review Cardiac Test Results',
      'Diagnostic Review',
      '2025-04-16',
      '10:30',
      '11:30',
      'Pending',
      'Analyze and provide feedback on the latest cardiac test results for patient in Room 405',
    ),
    new Task(
      2,
      2,
      'Neurological Assessment for Room 302',
      'Patient Consultation',
      '2025-04-15',
      '14:15',
      '15:00',
      'Pending',
      'Complete full neurological assessment for new patient',
    ),
    new Task(
      3,
      4,
      'Administer Medications to Ward B',
      'Medication Administration',
      '2025-04-14',
      '08:00',
      '09:00',
      'In Progress',
      'Distribute morning medications to all patients in Ward B',
    ),
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksByStaffId(staffId: number): Task[] {
    return this.tasks.filter((task) => task.staffId === staffId);
  }

  addTask(task: Omit<Task, 'id'>): Task {
    const newTask = new Task(
      this.tasks.length + 1,
      task.staffId,
      task.title,
      task.category,
      task.date,
      task.startTime,
      task.endTime,
      task.status,
      task.description,
    );

    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(
    taskId: number,
    status: 'Pending' | 'In Progress' | 'Completed',
  ): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return undefined;

    this.tasks[taskIndex].status = status;
    return this.tasks[taskIndex];
  }

  getTasksByStaffIdAndDate(staffId: number, date: string): Task[] {
    return this.tasks.filter(
      (task) => task.staffId === staffId && task.date === date,
    );
  }

  getTasksByDate(date: string): Task[] {
    return this.tasks.filter((task) => task.date === date);
  }
}

// src/controllers/task.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task.model';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('staff/:staffId')
  getTasksByStaffId(@Param('staffId') staffId: string): Task[] {
    return this.taskService.getTasksByStaffId(Number(staffId));
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    if (
      !createTaskDto.staffId ||
      !createTaskDto.title ||
      !createTaskDto.date ||
      !createTaskDto.startTime ||
      !createTaskDto.endTime ||
      !createTaskDto.category
    ) {
      throw new BadRequestException('Missing required task fields');
    }

    // Ensure status is set to 'Pending' if not provided
    const taskToCreate: Omit<Task, 'id'> = {
      staffId: createTaskDto.staffId,
      title: createTaskDto.title,
      category: createTaskDto.category,
      date: createTaskDto.date,
      startTime: createTaskDto.startTime,
      endTime: createTaskDto.endTime,
      description: createTaskDto.description,
      status: createTaskDto.status || 'Pending',
    };

    return this.taskService.createTask(taskToCreate);
  }

  @Post(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const updatedTask = this.taskService.updateTaskStatus(
      Number(id),
      updateTaskStatusDto.status,
    );

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return updatedTask;
  }
}

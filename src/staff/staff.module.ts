import { Module } from '@nestjs/common';
import { StaffController } from './controller/staff.controller';
import { StaffService } from './service/staff.service';
import { StaffRepository } from './repository/staff.repository';
import { StaffFactory } from './factory/staff.factory';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { MockDataRepository } from './repository/mock-data.repository';

@Module({
  controllers: [StaffController, TaskController],
  providers: [
    StaffService,
    StaffRepository,
    StaffFactory,
    TaskService,
    MockDataRepository,
  ],
  exports: [StaffService, TaskService],
})
export class StaffModule {}

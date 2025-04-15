import { Module } from '@nestjs/common';
import { StaffController } from './controller/staff.controller';
import { StaffService } from './service/staff.service';
import { StaffRepository } from './repository/staff.repository';
import { StaffFactory } from './factory/staff.factory';

@Module({
  controllers: [StaffController],
  providers: [StaffService, StaffRepository, StaffFactory],
  exports: [StaffService],
})
export class StaffModule {}

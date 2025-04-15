// src/controllers/staff.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { StaffService } from '../service/staff.service';
import { StaffBase } from '../model/staff-base.model';
import { FilterStaffDto } from '../dto/filter-staff.dto';
import { CreateUpdateStaffDto } from '../dto/create-update-staff.dto';

@Controller('api/staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  getAllStaff(@Query() filterDto: FilterStaffDto): StaffBase[] {
    return this.staffService.getAllStaff(filterDto);
  }

  @Get('departments')
  getDepartments(): { department: string[] } {
    return { department: this.staffService.getDepartment() };
  }

  @Get('roles')
  getRoles(): { roles: string[] } {
    return { roles: this.staffService.getRoles() };
  }

  @Get('statuses')
  getStatuses(): { statuses: string[] } {
    return { statuses: this.staffService.getStatuses() };
  }

  @Get(':id')
  getStaffById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ): StaffBase {
    return this.staffService.getStaffById(id);
  }

  @Post()
  createStaff(@Body() staffData: CreateUpdateStaffDto): StaffBase {
    return this.staffService.createStaff(staffData);
  }

  @Put(':id')
  updateStaff(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
    @Body() staffData: Partial<CreateUpdateStaffDto>,
  ): StaffBase {
    return this.staffService.updateStaff(id, staffData);
  }

  @Delete(':id')
  deleteStaff(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: number,
  ): { success: boolean } {
    this.staffService.deleteStaff(id);
    return { success: true };
  }
}

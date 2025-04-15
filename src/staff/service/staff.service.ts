// src/services/staff.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { StaffRepository } from '../repository/staff.repository';
import { StaffBase } from '../model/staff-base.model';
import { FilterStaffDto } from '../dto/filter-staff.dto';
import { CreateUpdateStaffDto } from '../dto/create-update-staff.dto';

@Injectable()
export class StaffService {
  constructor(private staffRepository: StaffRepository) {}

  getAllStaff(filterDto: FilterStaffDto = {}): StaffBase[] {
    return this.staffRepository.findAll(filterDto);
  }

  getStaffById(id: number): StaffBase {
    const found = this.staffRepository.findById(id);

    if (!found) {
      throw new NotFoundException(`Staff with ID "${id}" not found`);
    }

    return found;
  }

  createStaff(staffData: CreateUpdateStaffDto): StaffBase {
    return this.staffRepository.create(staffData);
  }

  updateStaff(id: number, staffData: Partial<CreateUpdateStaffDto>): StaffBase {
    const updated = this.staffRepository.update(id, staffData);

    if (!updated) {
      throw new NotFoundException(`Staff with ID "${id}" not found`);
    }

    return updated;
  }

  deleteStaff(id: number): void {
    const result = this.staffRepository.remove(id);

    if (!result) {
      throw new NotFoundException(`Staff with ID "${id}" not found`);
    }
  }

  getRoles(): string[] {
    return this.staffRepository.getRoles();
  }

  getStatuses(): string[] {
    return this.staffRepository.getStatuses();
  }

  getDepartment(): string[] {
    return this.staffRepository.getDepartments();
  }
}

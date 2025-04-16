// src/modules/workload/services/workload-stats.service.ts
import { Injectable } from '@nestjs/common';
import { TaskService } from './task.service';
import { StaffService } from './staff.service';
import { WorkloadMetrics } from '../interface/workload-metrics.interface';
import { DepartmentWorkload } from '../interface/department-workload.interface';
import { WorkloadSummary } from '../interface/workload-summary.interface';
import { TaskTypeDistribution } from '../interface/task-type-distribution.interface';

@Injectable()
export class WorkloadStatsService {
  constructor(
    private readonly taskService: TaskService,
    private readonly staffService: StaffService,
  ) {}
  // Convert time string to decimal hours for positioning
  timeToDecimal(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + minutes / 60;
  }
  calculateStaffWorkload(staffId: number, date: string): WorkloadMetrics {
    const staff = this.staffService.getStaffById(staffId);
    if (!staff) {
      throw new Error(`Staff with ID ${staffId} not found`);
    }

    const relevantTasks = this.taskService.getTasksByStaffIdAndDate(
      staffId,
      date,
    );

    const totalHours = relevantTasks.reduce(
      (sum, task) =>
        sum +
        (this.timeToDecimal(task.endTime) - this.timeToDecimal(task.startTime)),
      0,
    );
    const taskCount = relevantTasks.length;

    // Calculate task type distribution
    const typeDistribution = {};
    relevantTasks.forEach((task) => {
      if (!typeDistribution[task.category]) {
        typeDistribution[task.category] = 0;
      }
      typeDistribution[task.category]++;
    });

    // Calculate utilization (based on 8-hour workday)
    const dailyCapacity = 8; // hours per day
    const utilization = (totalHours / dailyCapacity) * 100;

    return {
      totalHours,
      taskCount,
      typeDistribution,
      utilization: Math.min(utilization, 100), // Cap at 100%
      staffName: staff.name,
      departmentName: staff.department,
      role: staff.role,
      date,
    };
  }

  getDepartmentWorkloadByDate(date: string): DepartmentWorkload[] {
    const departments = this.staffService
      .getDepartment()
      .filter((dept) => dept !== 'All Departments');

    const result: DepartmentWorkload[] = [];

    departments.forEach((dept) => {
      const staffInDept = this.staffService.getStaffByDepartment(dept);
      const staffCount = staffInDept.length;

      let totalHours = 0;
      let taskCount = 0;

      staffInDept.forEach((staff) => {
        const tasks = this.taskService.getTasksByStaffIdAndDate(staff.id, date);
        totalHours += tasks.reduce(
          (sum, task) =>
            sum +
            (this.timeToDecimal(task.endTime) -
              this.timeToDecimal(task.startTime)),
          0,
        );
        taskCount += tasks.length;
      });

      result.push({
        name: dept,
        hours: totalHours,
        tasks: taskCount,
        staff: staffCount,
      });
    });

    return result;
  }

  generateWorkloadSummary(
    date: string,
    filters?: {
      role?: string;
      department?: string;
      searchTerm?: string;
    },
  ): WorkloadSummary[] {
    let staff = this.staffService.getAllStaff();

    // Apply filters if provided
    if (filters) {
      if (filters.role && filters.role !== 'All Roles') {
        staff = staff.filter((s) => s.role === filters.role);
      }

      if (filters.department && filters.department !== 'All Departments') {
        staff = staff.filter((s) => s.department === filters.department);
      }

      if (filters.searchTerm) {
        staff = staff.filter(
          (s) =>
            filters.searchTerm &&
            s.name.toLowerCase().includes(filters.searchTerm.toLowerCase()),
        );
      }
    }

    // Calculate workload for each staff member
    const result = staff.map((s) => {
      const workload = this.calculateStaffWorkload(s.id, date);
      return {
        id: s.id,
        name: s.name.split(' ')[1], // Just last name for chart
        hours: workload.totalHours,
        tasks: workload.taskCount,
        utilization: workload.utilization,
        fullName: s.name,
        role: s.role,
        department: s.department,
        status: s.status,
      };
    });

    // Sort by utilization (descending)
    return result.sort((a, b) => b.utilization - a.utilization);
  }

  generateTaskTypeDistribution(
    staffId: number,
    date: string,
  ): TaskTypeDistribution[] {
    const tasks = this.taskService.getTasksByStaffIdAndDate(staffId, date);

    const typeCount = {};
    tasks.forEach((task) => {
      if (!typeCount[task.category]) {
        typeCount[task.category] = 0;
      }
      typeCount[task.category]++;
    });

    return Object.keys(typeCount).map((type) => ({
      name: type,
      value: typeCount[type],
    }));
  }

  getAverageUtilization(date: string): number {
    const staff = this.staffService
      .getAllStaff()
      .filter((s) => s.status === 'Active');

    if (staff.length === 0) return 0;

    const totalUtilization = staff.reduce((sum, s) => {
      const workload = this.calculateStaffWorkload(s.id, date);
      return sum + workload.utilization;
    }, 0);

    return Math.round(totalUtilization / staff.length);
  }

  getTotalAssignedHours(date: string): number {
    const tasks = this.taskService.getTasksByDate(date);
    return tasks.reduce(
      (sum, task) =>
        sum +
        (this.timeToDecimal(task.endTime) - this.timeToDecimal(task.startTime)),
      0,
    );
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { WorkloadStatsService } from '../service/workload-stats.service';
import { WorkloadMetrics } from '../interface/workload-metrics.interface';
import { DepartmentWorkload } from '../interface/department-workload.interface';
import { WorkloadSummary } from '../interface/workload-summary.interface';
import { TaskTypeDistribution } from '../interface/task-type-distribution.interface';
import { StaffFilterDto } from '../dto/filter-staff.dto';

@Controller('api/workload')
export class WorkloadController {
  constructor(private readonly workloadStatsService: WorkloadStatsService) {}

  @Get('staff/:id/date/:date')
  getStaffWorkload(
    @Param('id') id: string,
    @Param('date') date: string,
  ): WorkloadMetrics {
    return this.workloadStatsService.calculateStaffWorkload(+id, date);
  }

  @Get('departments/date/:date')
  getDepartmentWorkload(@Param('date') date: string): DepartmentWorkload[] {
    return this.workloadStatsService.getDepartmentWorkloadByDate(date);
  }

  @Get('summary/date/:date')
  getWorkloadSummary(
    @Param('date') date: string,
    @Query() filters: StaffFilterDto,
  ): WorkloadSummary[] {
    return this.workloadStatsService.generateWorkloadSummary(date, filters);
  }

  @Get('task-distribution/staff/:id/date/:date')
  getTaskTypeDistribution(
    @Param('id') id: string,
    @Param('date') date: string,
  ): TaskTypeDistribution[] {
    return this.workloadStatsService.generateTaskTypeDistribution(+id, date);
  }

  @Get('average-utilization/date/:date')
  getAverageUtilization(@Param('date') date: string): { utilization: number } {
    return { utilization: this.workloadStatsService.getAverageUtilization(date) };
  }

  @Get('total-hours/date/:date')
  getTotalHours(@Param('date') date: string): { hours: number } {
    return { hours: this.workloadStatsService.getTotalAssignedHours(date) };
  }
}
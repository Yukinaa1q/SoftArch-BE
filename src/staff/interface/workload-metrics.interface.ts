export interface WorkloadMetrics {
  totalHours: number;
  taskCount: number;
  typeDistribution: Record<string, number>;
  utilization: number;
  staffName: string;
  departmentName: string;
  role: string;
  date: string;
}

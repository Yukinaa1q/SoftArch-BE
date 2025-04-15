export class CreateTaskDto {
  staffId: number;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  status?: 'Pending' | 'In Progress' | 'Completed';
  description?: string;
}

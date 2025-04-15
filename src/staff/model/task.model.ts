export class Task {
  id: number;
  staffId: number;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  description?: string;

  constructor(
    id: number,
    staffId: number,
    title: string,
    category: string,
    date: string,
    startTime: string,
    endTime: string,
    status: string,
    description?: string,
  ) {
    this.id = id;
    this.staffId = staffId;
    this.title = title;
    this.category = category;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.description = description;
  }
}

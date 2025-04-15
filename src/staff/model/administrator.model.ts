import { StaffBase } from './staff-base.model';

export class Administrator extends StaffBase {
  specialty: string;
  education: string;
  responsibilities: string[];

  constructor(partial: Partial<Administrator>) {
    super();
    this.role = 'Administrator';
    Object.assign(this, partial);
  }
}

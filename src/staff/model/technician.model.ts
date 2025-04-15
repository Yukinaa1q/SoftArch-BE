import { StaffBase } from './staff-base.model';

export class Technician extends StaffBase {
  specialty: string;
  education: string;
  equipmentExpertise: string[];

  constructor(partial: Partial<Technician>) {
    super();
    this.role = 'Technician';
    Object.assign(this, partial);
  }
}

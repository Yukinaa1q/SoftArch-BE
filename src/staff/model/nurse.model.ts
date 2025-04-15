import { StaffBase } from './staff-base.model';

export class Nurse extends StaffBase {
  specialty: string;
  education: string;
  patientLoad: number;

  constructor(partial: Partial<Nurse>) {
    super();
    this.role = 'Nurse';
    Object.assign(this, partial);
  }
}

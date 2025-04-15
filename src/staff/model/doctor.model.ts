import { StaffBase } from './staff-base.model';

export class Doctor extends StaffBase {
  specialty: string;
  education: string;
  patientLoad: number;

  constructor(partial: Partial<Doctor>) {
    super();
    this.role = 'Doctor';
    Object.assign(this, partial);
  }
}

import { StaffBaseDto } from './staff-base.dto';

export class NurseDto extends StaffBaseDto {
  readonly role: string = 'Nurse';
  specialty: string;
  education: string;
  patientLoad: number;
}

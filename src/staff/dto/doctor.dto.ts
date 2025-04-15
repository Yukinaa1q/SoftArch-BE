import { StaffBaseDto } from './staff-base.dto';

export class DoctorDto extends StaffBaseDto {
  readonly role: string = 'Doctor';
  specialty: string;
  education: string;
  patientLoad: number;
}

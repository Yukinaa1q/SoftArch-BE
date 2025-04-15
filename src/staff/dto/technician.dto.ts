import { StaffBaseDto } from './staff-base.dto';

export class TechnicianDto extends StaffBaseDto {
  readonly role: string = 'Technician';
  specialty: string;
  education: string;
  equipmentExpertise: string[];
}

import { StaffBaseDto } from './staff-base.dto';

export class AdministratorDto extends StaffBaseDto {
  readonly role: string = 'Administrator';
  specialty: string;
  education: string;
  responsibilities: string[];
}

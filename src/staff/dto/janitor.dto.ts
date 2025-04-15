import { StaffBaseDto } from './staff-base.dto';

export class JanitorDto extends StaffBaseDto {
  readonly role: string = 'Janitor';
  areas: string[];
}

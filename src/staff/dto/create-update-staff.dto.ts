import { DoctorDto } from './doctor.dto';
import { NurseDto } from './nurse.dto';
import { TechnicianDto } from './technician.dto';
import { JanitorDto } from './janitor.dto';
import { AdministratorDto } from './administrator.dto';

export type CreateUpdateStaffDto =
  | DoctorDto
  | NurseDto
  | TechnicianDto
  | JanitorDto
  | AdministratorDto;

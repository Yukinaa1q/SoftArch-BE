// src/factories/staff.factory.ts
import { Injectable } from '@nestjs/common';
import { StaffBase } from '../model/staff-base.model';
import { Doctor } from '../model/doctor.model';
import { Nurse } from '../model/nurse.model';
import { Technician } from '../model/technician.model';
import { Janitor } from '../model/janitor.model';
import { Administrator } from '../model/administrator.model';
type StaffCreationData =
  | (Partial<StaffBase> & {
      role: 'Doctor';
      specialty: string;
      education: string;
      patientLoad: number;
    })
  | (Partial<StaffBase> & {
      role: 'Nurse';
      specialty: string;
      education: string;
      patientLoad: number /* Add Nurse-specific props */;
    })
  | (Partial<StaffBase> & {
      role: 'Technician';
      specialty: string;
      education: string;
      equipmentExpertise: string[] /* Add Technician-specific props */;
    })
  | (Partial<StaffBase> & {
      role: 'Janitor';
      areas: string[] /* Add Janitor-specific props */;
    })
  | (Partial<StaffBase> & {
      role: 'Administrator';
      specialty: string;
      education: string;
      responsibilities: string[] /* Add Admin-specific props */;
    });
@Injectable()
export class StaffFactory {
  createStaff(staffData: StaffCreationData): StaffBase {
    switch (staffData.role) {
      case 'Doctor':
        return new Doctor(staffData);
      case 'Nurse':
        return new Nurse(staffData);
      case 'Technician':
        return new Technician(staffData);
      case 'Janitor':
        return new Janitor(staffData);
      case 'Administrator':
        return new Administrator(staffData);
      default:
        throw new Error(`Invalid staff role: ${(staffData as any).role}`);
    }
  }
}

// src/repositories/staff.repository.ts
import { Injectable } from '@nestjs/common';
import { StaffBase } from '../model/staff-base.model';
import { Doctor } from '../model/doctor.model';
import { Nurse } from '../model/nurse.model';
import { Technician } from '../model/technician.model';
import { Janitor } from '../model/janitor.model';
import { Administrator } from '../model/administrator.model';
import { FilterStaffDto } from '../dto/filter-staff.dto';
import { StaffFactory } from '../factory/staff.factory';

@Injectable()
export class StaffRepository {
  private staff: StaffBase[] = [];

  constructor(private staffFactory: StaffFactory) {
    this.initMockData();
  }

  private initMockData(): void {
    // Doctors
    this.staff.push(
      this.staffFactory.createStaff({
        id: 1,
        name: 'Dr. Sarah Johnson',
        role: 'Doctor',
        specialty: 'Cardiology',
        department: 'Cardiac Care',
        email: 'sarah.johnson@hospital.com',
        phone: '(555) 123-4567',
        joinDate: '2018-05-12',
        education: 'Johns Hopkins University School of Medicine',
        certifications: [
          'Board Certified in Cardiology',
          'Advanced Cardiac Life Support',
        ],
        scheduleHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
        patientLoad: 24,
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    this.staff.push(
      new Doctor({
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Neurology',
        department: 'Neuroscience',
        email: 'michael.chen@hospital.com',
        phone: '(555) 234-5678',
        joinDate: '2015-08-23',
        education: 'Stanford Medical School',
        certifications: [
          'Board Certified in Neurology',
          'Neurological Surgery Certification',
        ],
        scheduleHours: 'Tue-Sat: 9:00 AM - 6:00 PM',
        patientLoad: 18,
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    // Nurses
    this.staff.push(
      new Nurse({
        id: 3,
        name: 'Rebecca Torres',
        specialty: 'Registered Nurse',
        department: 'Emergency Room',
        email: 'rebecca.torres@hospital.com',
        phone: '(555) 345-6789',
        joinDate: '2019-03-15',
        education: 'University of Michigan School of Nursing',
        certifications: ['Basic Life Support', 'Advanced Cardiac Life Support'],
        scheduleHours: 'Wed-Sun: 7:00 AM - 7:00 PM',
        patientLoad: 12,
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    this.staff.push(
      new Nurse({
        id: 4,
        name: 'John Patterson',
        specialty: 'Pediatric Nurse',
        department: "Children's Health",
        email: 'john.patterson@hospital.com',
        phone: '(555) 456-7890',
        joinDate: '2020-11-08',
        education: 'NYU Rory Meyers College of Nursing',
        certifications: [
          'Pediatric Advanced Life Support',
          'Neonatal Resuscitation Program',
        ],
        scheduleHours: 'Mon-Thu: 6:00 AM - 6:00 PM',
        patientLoad: 8,
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    // Technicians
    this.staff.push(
      new Technician({
        id: 5,
        name: 'Lisa Morgan',
        specialty: 'Radiology Technician',
        department: 'Radiology',
        email: 'lisa.morgan@hospital.com',
        phone: '(555) 567-8901',
        joinDate: '2017-06-20',
        education: 'Technical College of Georgia',
        certifications: [
          'Registered Radiologic Technologist',
          'MRI Safety Certification',
        ],
        scheduleHours: 'Mon-Fri: 9:00 AM - 5:30 PM',
        equipmentExpertise: ['X-Ray', 'CT Scan', 'MRI'],
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    // Janitors
    this.staff.push(
      new Janitor({
        id: 6,
        name: 'Robert Garcia',
        department: 'Facilities Management',
        email: 'robert.garcia@hospital.com',
        phone: '(555) 678-9012',
        joinDate: '2021-02-10',
        scheduleHours: 'Mon-Fri: 10:00 PM - 6:00 AM',
        areas: ['Main Wing', 'Emergency Room', 'Cafeteria'],
        certifications: ['Hazardous Materials Handling'],
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    // Administrators
    this.staff.push(
      new Administrator({
        id: 7,
        name: 'Angela Brooks',
        specialty: 'Financial Administrator',
        department: 'Finance',
        email: 'angela.brooks@hospital.com',
        phone: '(555) 789-0123',
        joinDate: '2016-09-12',
        education: 'Wharton School of Business',
        certifications: ['Certified Healthcare Financial Professional'],
        scheduleHours: 'Mon-Fri: 8:30 AM - 5:30 PM',
        responsibilities: [
          'Budget Management',
          'Financial Reporting',
          'Insurance Claims',
        ],
        status: 'Active',
        imageUrl: '/api/placeholder/150/150',
      }),
    );

    this.staff.push(
      new Administrator({
        id: 8,
        name: 'Marcus Johnson',
        specialty: 'HR Manager',
        department: 'Human Resources',
        email: 'marcus.johnson@hospital.com',
        phone: '(555) 890-1234',
        joinDate: '2018-11-15',
        education: 'Cornell University',
        certifications: ['Professional in Human Resources'],
        scheduleHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
        responsibilities: [
          'Staff Recruitment',
          'Benefits Administration',
          'Employee Relations',
        ],
        status: 'On Leave',
        imageUrl: '/api/placeholder/150/150',
      }),
    );
  }

  findAll(filterDto: FilterStaffDto = {}): StaffBase[] {
    let staff = this.staff;
    // Apply filters if they exist
    if (filterDto.searchTerm) {
      const searchTerm = filterDto.searchTerm.toLowerCase();
      staff = staff.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm) ||
          member.department.toLowerCase().includes(searchTerm) ||
          ('specialty' in member &&
            typeof member.specialty === 'string' &&
            searchTerm.toLowerCase().includes(member.specialty.toString())),
      );
    }

    if (filterDto.role) {
      staff = staff.filter((member) => member.role === filterDto.role);
    }

    if (filterDto.status) {
      staff = staff.filter((member) => member.status === filterDto.status);
    }

    return staff;
  }

  findById(id: number): StaffBase | undefined {
    return this.staff.find((member) => member.id === id);
  }

  create(staffData: Partial<StaffBase>): StaffBase {
    const newId = Math.max(...this.staff.map((s) => s.id), 0) + 1;

    let newStaff: StaffBase;

    // Create the appropriate staff type based on role
    switch (staffData.role) {
      case 'Doctor':
        newStaff = new Doctor({ ...staffData, id: newId });
        break;
      case 'Nurse':
        newStaff = new Nurse({ ...staffData, id: newId });
        break;
      case 'Technician':
        newStaff = new Technician({ ...staffData, id: newId });
        break;
      case 'Janitor':
        newStaff = new Janitor({ ...staffData, id: newId });
        break;
      case 'Administrator':
        newStaff = new Administrator({ ...staffData, id: newId });
        break;
      default:
        throw new Error(`Invalid staff role: ${staffData.role}`);
    }

    this.staff.push(newStaff);
    return newStaff;
  }

  update(id: number, staffData: Partial<StaffBase>): StaffBase | undefined {
    const index = this.staff.findIndex((member) => member.id === id);

    if (index === -1) {
      return undefined;
    }

    // If role is being changed, we need to create a new instance of the right type
    if (staffData.role && staffData.role !== this.staff[index].role) {
      // Remove the old staff member
      this.staff.splice(index, 1);

      // Create a new staff member with the same ID but new role
      return this.create({ ...staffData, id });
    } else {
      // Just update the existing staff member
      Object.assign(this.staff[index], staffData);
      return this.staff[index];
    }
  }

  remove(id: number): boolean {
    const index = this.staff.findIndex((member) => member.id === id);

    if (index === -1) {
      return false;
    }

    this.staff.splice(index, 1);
    return true;
  }

  getRoles(): string[] {
    return ['Doctor', 'Nurse', 'Technician', 'Janitor', 'Administrator'];
  }

  getStatuses(): string[] {
    return ['Active', 'On Leave', 'Remote', 'Terminated'];
  }
}

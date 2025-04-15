import { StaffBase } from './staff-base.model';

export class Janitor extends StaffBase {
  areas: string[];

  constructor(partial: Partial<Janitor>) {
    super();
    this.role = 'Janitor';
    Object.assign(this, partial);
  }
}

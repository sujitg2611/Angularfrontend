import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { EmployeeFormComponent } from './components/employee_form/employee_form.component';
import { EmployeeListComponent } from './components/employee_list/employee_list.component';
import { EmployeeEditComponent } from './components/employee_editForm/employee_edit.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'add-employee', component: EmployeeFormComponent },
  { path: 'employee-list', component: EmployeeListComponent, runGuardsAndResolvers: 'always' },
  { path: 'employee-edit/:id', component: EmployeeEditComponent }
];

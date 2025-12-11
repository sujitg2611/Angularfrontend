import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({ selector: 'app-employee-form', standalone: true, imports: [FormsModule, CommonModule], templateUrl: './employee_form.component.html' })
export class EmployeeFormComponent {
  emp: Employee = { name: '', phone: '', address: '', department: '' };


  constructor(private svc: EmployeeService, private router: Router) { }


  submit() {
    this.svc.create(this.emp).subscribe(() => {
      alert('Employee Added');
      this.router.navigate(['/employee-list']);
    });
  }
}

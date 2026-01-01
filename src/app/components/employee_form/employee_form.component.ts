import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({ selector: 'app-employee-form', standalone: true, imports: [FormsModule, CommonModule, MatSnackBarModule], templateUrl: './employee_form.component.html' })
export class EmployeeFormComponent {
  emp: Employee = { name: '', phone: '', address: '', department: '' };


  constructor(private svc: EmployeeService, private router: Router, private snackBar: MatSnackBar) { }


  submit() {
    this.svc.create(this.emp).subscribe(() => {
      this.showSuccess();
      this.router.navigate(['/employee-list']);
    });
  }

  private showSuccess() {
    this.snackBar.open(
      'Employee Added',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      }
    );
  }
}

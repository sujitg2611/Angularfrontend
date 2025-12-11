import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee_edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = { name: '', phone: '', address: '', department: '' };
  loading: boolean = false;

  constructor(
    private svc: EmployeeService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.svc.get(id).subscribe({
        next: (data) => {
          this.employee = data;
          this.loading = false;
        },
        error: () => (this.loading = false)
      });
    }
  }

  update() {
    if (!this.employee.id) return;
    this.svc.update(this.employee.id, this.employee).subscribe({
      next: () => this.router.navigate(['/employee-list']),
      error: (err) => console.error(err)
    });
  }
}

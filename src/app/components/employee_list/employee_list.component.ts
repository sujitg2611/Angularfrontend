import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../utils/confirm_dialog/confirm_dialog.component';

@Component({ selector: 'app-employee-list', standalone: true, imports: [FormsModule, CommonModule, RouterLink], templateUrl: './employee_list.component.html' })
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = false;

  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  paginatedEmployees: Employee[] = [];

  setPage(page: number) {
    this.currentPage = page;

    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedEmployees = this.employees.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
  constructor(private svc: EmployeeService, private cd: ChangeDetectorRef, private dialog: MatDialog, private router: Router) {
  }


  ngOnInit() {
    this.load();
  }


  load() {
    this.loading = true;

    this.svc.getAll().subscribe({
      next: (data) => {
        this.employees = data;

        this.totalPages = Math.ceil(this.employees.length / this.pageSize);
        this.setPage(1);

        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }


  delete(id: number) {
    if (!confirm('Delete employee?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }

  deleteEmployee(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this employee?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.svc.delete(id).subscribe(() => {
          this.load();
        })
      }
    })
  }

  editEmployee(emp: Employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Edit',
        message: 'Do you want to edit this employee?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/employee-edit', emp.id]);
      }
    })
  }

  edit(emp: Employee) {
    const updated = {
      name: prompt('Name', emp.name) || emp.name,
      phone: prompt('Phone', emp.phone) || emp.phone,
      address: prompt('Address', emp.address) || emp.address,
      department: prompt('Department', emp.department) || emp.department
    };


    this.svc.update(emp.id!, updated).subscribe(() => this.load());
  }
}

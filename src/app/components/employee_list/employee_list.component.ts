import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({ selector: 'app-employee-list', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './employee_list.component.html' })
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = false;

  pageSize: number = 5;       // show 5 employees per page
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
  constructor(private svc: EmployeeService) {
  }


  ngOnInit() {
    this.load(); // Only one load
  }


  load() {
    this.loading = true;

    this.svc.getAll().subscribe({
      next: (data) => {
        this.employees = data;

        this.totalPages = Math.ceil(this.employees.length / this.pageSize);
        this.setPage(1);  // show first page on load

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  delete(id: number) {
    if (!confirm('Delete employee?')) return;
    this.svc.delete(id).subscribe(() => this.load());
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

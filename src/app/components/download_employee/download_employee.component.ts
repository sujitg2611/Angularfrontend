import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import * as XLSX from 'xlsx';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-download-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './download_employee.component.html'
})
export class DownloadEmployeeComponent {

  selectedOption: 'ALL' | 'BY_ID' = 'ALL';
  employeeId?: number;

  constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar) { }

  onOptionChange() {
    if (this.selectedOption === 'ALL') {
      this.employeeId = undefined;
    }
  }

  download() {
    if (this.selectedOption === 'ALL') {
      this.downloadAllEmployees();
    } else {
      this.downloadEmployeeById();
    }
  }

  private downloadAllEmployees() {
    this.employeeService.getAll().subscribe({
      next: data => {
        this.exportToExcel(data, 'all-employees');
        this.showSuccess();
      }, error: () => {
        this.showError();
      }
    });
  }

  private downloadEmployeeById() {
    if (!this.employeeId) {
      alert('Please enter employee ID');
      return;
    }

    this.employeeService.get(this.employeeId).subscribe({
      next: emp => {
        this.exportToExcel([emp], `employee-${this.employeeId}`);
        this.showSuccess();
      },
      error: () => {
        this.showError();
      }
    });
  }

  private exportToExcel(data: Employee[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  private showSuccess() {
    this.snackBar.open(
      'Report Generated Successfully',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      }
    );
  }

  private showError(message: string = 'Error Generating Report') {
    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      }
    );
  }
}

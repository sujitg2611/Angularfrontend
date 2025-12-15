import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EmployeeListComponent } from './employee_list.component';
import { EmployeeService, Employee } from '../../services/employee.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  const mockEmployees: Employee[] = [
    { id: 1, name: 'A', phone: '1111111111', address: 'Addr1', department: 'IT' },
    { id: 2, name: 'B', phone: '2222222222', address: 'Addr2', department: 'HR' },
    { id: 3, name: 'C', phone: '3333333333', address: 'Addr3', department: 'IT' },
    { id: 4, name: 'D', phone: '4444444444', address: 'Addr4', department: 'IT' },
    { id: 5, name: 'E', phone: '5555555555', address: 'Addr5', department: 'HR' },
    { id: 6, name: 'F', phone: '6666666666', address: 'Addr6', department: 'HR' }
  ];

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'delete']);

    employeeServiceSpy.getAll.and.returnValue(of(mockEmployees));
    employeeServiceSpy.delete.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        EmployeeListComponent,
        CommonModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should show loader while loading', fakeAsync(() => {
    const subject = new Subject<Employee[]>();
    employeeServiceSpy.getAll.and.returnValue(subject.asObservable());

    fixture.detectChanges();
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinner).not.toBeNull();

    subject.next(mockEmployees);
    subject.complete();
    tick();
    fixture.detectChanges();

    const spinnerAfter = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinnerAfter).toBeNull();
  }));

  it('should load and display employees', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.employees.length).toBe(6);

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
  }));

  it('should paginate to next page', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.nextPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    expect(component.paginatedEmployees.length).toBe(1);
  }));

  it('should paginate to previous page', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.nextPage();
    component.prevPage();
    fixture.detectChanges();

    expect(component.currentPage).toBe(1);
  }));

  it('should call delete service when delete confirmed', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    component.delete(1);
    tick();

    expect(employeeServiceSpy.delete).toHaveBeenCalledWith(1);
  }));


  it('should navigate to edit page when Edit button is clicked', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const buttons: HTMLButtonElement[] =
      Array.from(fixture.nativeElement.querySelectorAll('button'));

    const editButton = buttons.find(btn =>
      btn.textContent?.trim() === 'Edit'
    );

    expect(editButton).toBeTruthy();

    editButton!.click();
    tick();

    expect(navigateSpy).toHaveBeenCalled();
  }));


});

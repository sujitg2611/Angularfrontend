import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee_form.component';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent, FormsModule],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable Save button when form is invalid', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');

    expect(button.disabled).toBeTrue();
  }));

  it('should enable Save button when form is valid', fakeAsync(() => {
    component.emp = {
      name: 'John',
      phone: '1234567890',
      address: 'Bangalore',
      department: 'IT'
    };

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');

    expect(button.disabled).toBeFalse();
  }));

  it('should call create() and navigate on submit', fakeAsync(() => {
    component.emp = {
      name: 'John',
      phone: '1234567890',
      address: 'Bangalore',
      department: 'IT'
    };

    employeeServiceSpy.create.and.returnValue(of(component.emp));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');
    button.click();

    expect(employeeServiceSpy.create).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/employee-list']);
  }));
});

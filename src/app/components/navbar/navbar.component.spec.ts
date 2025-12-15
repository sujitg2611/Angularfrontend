import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the navbar title', () => {
    const title = fixture.debugElement.query(
      By.css('.navbar-brand')
    ).nativeElement as HTMLElement;

    expect(title.textContent).toContain('Employee Management System');
  });

  it('should have Home link with correct route', () => {
    const homeLink = fixture.debugElement.queryAll(
      By.css('a.nav-link')
    )[0].nativeElement as HTMLAnchorElement;

    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('should have Add Employee link with correct route', () => {
    const addEmployeeLink = fixture.debugElement.queryAll(
      By.css('a.nav-link')
    )[1].nativeElement as HTMLAnchorElement;

    expect(addEmployeeLink.getAttribute('href')).toBe('/add-employee');
  });

  it('should have Employee List link with correct route', () => {
    const employeeListLink = fixture.debugElement.queryAll(
      By.css('a.nav-link')
    )[2].nativeElement as HTMLAnchorElement;

    expect(employeeListLink.getAttribute('href')).toBe('/employee-list');
  });
});

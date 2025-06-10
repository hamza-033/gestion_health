import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientFormComponent } from './patient-form.component';
import { PatientService } from '../../src/app/services/patient.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('PatientFormComponent', () => {
  let component: PatientFormComponent;
  let fixture: ComponentFixture<PatientFormComponent>;
  let mockPatientService: jasmine.SpyObj<PatientService>;

  beforeEach(async () => {
    mockPatientService = jasmine.createSpyObj('PatientService', ['create']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PatientFormComponent],
      providers: [
        { provide: PatientService, useValue: mockPatientService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty patient form', () => {
    expect(component.patient).toEqual({
      name: '',
      email: '',
      phone: ''
    });
  });

  it('should call patientService.create on form submit', () => {
    const testPatient = {
      name: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890'
    };
    component.patient = testPatient;
    mockPatientService.create.and.returnValue(of({}));

    component.submit();

    expect(mockPatientService.create).toHaveBeenCalledWith(testPatient);
  });

  it('should reset form after successful submission', () => {
    const testPatient = {
      name: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890'
    };
    component.patient = testPatient;
    mockPatientService.create.and.returnValue(of({}));

    component.submit();

    expect(component.patient).toEqual({
      name: '',
      email: '',
      phone: ''
    });
  });

  it('should display validation errors for required fields', () => {
    const compiled = fixture.nativeElement;
    const form = compiled.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const errorMessages = compiled.querySelectorAll('.error-message');
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});

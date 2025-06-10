import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../../src/app/services/patient.service';
import { of, Subject } from 'rxjs';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;
  let mockPatientService: jasmine.SpyObj<PatientService>;
  let refreshSubject: Subject<void>;

  const mockPatients = [
    { _id: '1', name: 'Patient 1', email: 'p1@test.com', phone: '1111111111' },
    { _id: '2', name: 'Patient 2', email: 'p2@test.com', phone: '2222222222' }
  ];

  beforeEach(async () => {
    refreshSubject = new Subject<void>();
    mockPatientService = jasmine.createSpyObj('PatientService',
      ['getAll', 'delete'],
      { refresh$: refreshSubject.asObservable() }
    );

    await TestBed.configureTestingModule({
      declarations: [PatientListComponent],
      providers: [
        { provide: PatientService, useValue: mockPatientService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients on init', () => {
    mockPatientService.getAll.and.returnValue(of(mockPatients));
    fixture.detectChanges();

    expect(component.patients).toEqual(mockPatients);
    expect(mockPatientService.getAll).toHaveBeenCalled();
  });

  it('should refresh patients when refresh$ emits', () => {
    mockPatientService.getAll.and.returnValue(of(mockPatients));
    fixture.detectChanges(); // Initial load

    const newPatients = [...mockPatients,
      { _id: '3', name: 'Patient 3', email: 'p3@test.com', phone: '3333333333' }];
    mockPatientService.getAll.and.returnValue(of(newPatients));

    refreshSubject.next(); // Trigger refresh
    fixture.detectChanges();

    expect(component.patients).toEqual(newPatients);
    expect(mockPatientService.getAll).toHaveBeenCalledTimes(2);
  });

  it('should call delete when delete button is clicked', () => {
    mockPatientService.getAll.

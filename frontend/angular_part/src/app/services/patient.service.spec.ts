import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;

  const mockPatient = {
    _id: '123',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '0123456789'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });

    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a patient', () => {
    service.create(mockPatient).subscribe(response => {
      expect(response).toEqual(mockPatient);
    });

    const req = httpMock.expectOne('http://localhost:5000/patients');
    expect(req.request.method).toBe('POST');
    req.flush(mockPatient);
  });

  it('should get all patients', () => {
    const patients = [mockPatient];

    service.getAll().subscribe(response => {
      expect(response).toEqual(patients);
    });

    const req = httpMock.expectOne('http://localhost:5000/patients');
    expect(req.request.method).toBe('GET');
    req.flush(patients);
  });

  it('should update a patient', () => {
    const updatedPatient = { ...mockPatient, name: 'Jean Durand' };

    service.update(mockPatient._id, updatedPatient).subscribe(response => {
      expect(response).toEqual(updatedPatient);
    });

    const req = httpMock.expectOne(`http://localhost:5000/patients/${mockPatient._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPatient);
  });

  it('should delete a patient', () => {
    service.delete(mockPatient._id).subscribe(response => {
      expect(response).toBeNull(); // Ou ce que votre API retourne
    });

    const req = httpMock.expectOne(`http://localhost:5000/patients/${mockPatient._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should emit and listen to refresh$', (done) => {
    service.refresh.subscribe(() => {
      done(); // Le test passe si cette callback est appelée
    });

    service.refresh.next(); // Déclenche l'émission
  });
});

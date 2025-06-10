import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedecinService } from './patient.service';

describe('MedecinService', () => {
  let service: MedecinService;
  let httpMock: HttpTestingController;

  const mockMedecin = {
    _id: '123',
    nom: 'Dupont',
    specialite: 'Cardiologie'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedecinService]
    });

    service = TestBed.inject(MedecinService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a medecin', () => {
    service.create(mockMedecin).subscribe(response => {
      expect(response).toEqual(mockMedecin);
    });

    const req = httpMock.expectOne('http://localhost:5000/medecins');
    expect(req.request.method).toBe('POST');
    req.flush(mockMedecin);
  });

  it('should get all medecins', () => {
    const medecins = [mockMedecin];

    service.getAll().subscribe(response => {
      expect(response).toEqual(medecins);
    });

    const req = httpMock.expectOne('http://localhost:5000/medecins');
    expect(req.request.method).toBe('GET');
    req.flush(medecins);
  });

  it('should update a medecin', () => {
    const updated = { ...mockMedecin, nom: 'Durand' };

    service.update(mockMedecin._id, updated).subscribe(response => {
      expect(response).toEqual(updated);
    });

    const req = httpMock.expectOne(`http://localhost:5000/medecins/${mockMedecin._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updated);
  });

  it('should delete a medecin', () => {
    service.delete(mockMedecin._id).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:5000/medecins/${mockMedecin._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should emit and listen to refresh$', (done) => {
    service.refresh.subscribe(() => {
      done(); // test passes if this is called
    });

    service.triggerRefresh();
  });
});

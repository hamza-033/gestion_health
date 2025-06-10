import { TestBed } from '@angular/core/testing';
import { ConsultService } from './consultation.service'; // Changé de ConsultationService à ConsultService

describe('ConsultService', () => { // Changé le nom du describe
  let service: ConsultService; // Changé le type

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultService); // Changé ici
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

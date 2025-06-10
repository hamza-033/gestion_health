import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../src/app/services/patient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnDestroy {
  private patientService = inject(PatientService);
  patients: any[] = [];
  private sub: Subscription;

  constructor() {
    this.loadPatients();
    this.sub = this.patientService.refresh$.subscribe(() => this.loadPatients());
  }

  loadPatients() {
    this.patientService.getAll().subscribe(data => this.patients = data);
  }

  delete(id: string) {
    if(confirm('Supprimer ce patient?')) {
      this.patientService.delete(id).subscribe(() => this.loadPatients());
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

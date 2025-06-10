import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {
  private patientService = inject(PatientService);
  patient = { name: '', email: '', phone: '' };

  submit() {
    this.patientService.create(this.patient).subscribe(() => {
      alert('Patient créé');
      this.patient = { name: '', email: '', phone: '' };
      this.patientService.refresh.next();
    });
  }
}

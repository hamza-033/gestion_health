import { Routes } from '@angular/router';
import { ConsultationListComponent } from '../../components/consultation-list/consultation-list.component';
import { ConsultationDetailComponent } from '../../components/consultation-detail/consultation-detail.component';
import { RendezvousListComponent } from '../../components/rendezvous-list/rendezvous-list.component';
import { RendezvousFormComponent } from '../../components/rendezvous-form/rendezvous-form.component';
import { ConsultationFormComponent } from '../../components/consultation-form/consultation-form.component';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';
import { PatientListComponent  } from '../../components/patient-list/patient-list.component';

import { NavbarComponent } from '../../components/navbar/navbar.component';

export const routes: Routes = [
  { path: 'list-consults', component: ConsultationListComponent },
  { path: 'detail-consult', component: ConsultationDetailComponent },
  { path: 'list-rdv', component: RendezvousListComponent },
  { path: 'form-rdv', component: RendezvousFormComponent },
  { path: 'form-consult', component: ConsultationFormComponent },
  { path: '', redirectTo: 'list-rdv', pathMatch: 'full' },
  { path: '**', redirectTo: 'list-rdv' }
  { path: 'medecin/patients', component: PatientListComponent },
  { path: 'medecin/patient/nouveau', component: PatientFormComponent },
  { path: 'medecin/patient/modifier/:id', component: PatientFormComponent },
];

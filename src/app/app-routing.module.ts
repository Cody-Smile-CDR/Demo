import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { PatientsComponent } from './patients/patients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'patients',
    component: PatientsComponent
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent
  },
  { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

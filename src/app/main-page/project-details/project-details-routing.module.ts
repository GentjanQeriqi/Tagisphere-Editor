import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CadComponent } from './cad/cad.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'map/:id', component: MapComponent },
  { path: 'cad', component: CadComponent },
  // { path: 'surveyors', component: SurveyorsComponent },
  // { path: 'surveyors/:id', component: SurveyorsComponent },
  {
    path: 'surveyors/:id',
    loadChildren: () =>
      import('./surveyors/surveyors.module').then((m) => m.SurveyorsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDetailsRoutingModule {}

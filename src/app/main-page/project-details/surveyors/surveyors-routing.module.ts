import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyorsComponent } from './surveyors.component';
import { TagToolsComponent } from './tag-tools/tag-tools.component';
import { ProjectInformationComponent } from './project-information/project-information.component';

const routes: Routes = [
  {path: '', component: SurveyorsComponent, children: [
    { path: 'tag-tools', component: TagToolsComponent },
    { path: 'project-information', component: ProjectInformationComponent },
    { path: '', redirectTo: 'project-information', pathMatch: 'full' },
  ]},
  // Default route

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyorsRoutingModule { }

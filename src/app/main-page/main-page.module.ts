import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimeNgModule } from '../shared/primeng.module';
import { InputTextModule } from 'primeng/inputtext';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog/new-project-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardProjectsComponent } from './dashboard/dashboard-projects/dashboard-projects.component';
import { DashboardUsersComponent } from './dashboard/dashboard-users/dashboard-users.component';
import { FileUploadComponent } from '../shared/file-upload/file-upload.component';
import { CsvTableComponent } from './project-details/surveyors/project-information/csv-import/csv-table/csv-table.component';
import { CsvConfigurationsComponent } from './project-details/surveyors/project-information/csv-import/csv-configurations/csv-configurations.component';
import { ProjectDetailsModule } from './project-details/project-details.module';

@NgModule({
  declarations: [
    MainPageComponent,
    DashboardComponent,
    NewProjectDialogComponent,
    DashboardProjectsComponent,
    DashboardUsersComponent,

    CsvTableComponent,
    CsvConfigurationsComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    PrimeNgModule,
    InputTextModule,
    ReactiveFormsModule,
    ProjectDetailsModule
  ]
})
export class MainPageModule {}

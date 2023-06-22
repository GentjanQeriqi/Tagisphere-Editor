import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { MapComponent } from './map/map.component';
import { CadComponent } from './cad/cad.component';
import { SurveyorsComponent } from './surveyors/surveyors.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectInformationComponent } from './surveyors/project-information/project-information.component';
import { CsvImportComponent } from './surveyors/project-information/csv-import/csv-import.component';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { TagToolsComponent } from './surveyors/tag-tools/tag-tools.component';


@NgModule({
  declarations: [MapComponent, CadComponent],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectDetailsModule {}

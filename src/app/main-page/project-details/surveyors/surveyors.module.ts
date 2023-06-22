import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyorsRoutingModule } from './surveyors-routing.module';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { CsvImportComponent } from './project-information/csv-import/csv-import.component';
import { ProjectInformationComponent } from './project-information/project-information.component';
import { SurveyorsComponent } from './surveyors.component';
import { TagToolsComponent } from './tag-tools/tag-tools.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagToolsDialogComponent } from './tag-tools/tag-tools-dialog/tag-tools-dialog.component';


@NgModule({
  declarations: [ SurveyorsComponent, ProjectInformationComponent, CsvImportComponent, FileUploadComponent, TagToolsComponent, TagToolsDialogComponent],
  imports: [
    CommonModule,
    SurveyorsRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SurveyorsModule { }

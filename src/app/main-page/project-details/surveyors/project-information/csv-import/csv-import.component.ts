import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, EMPTY, filter, merge, ReplaySubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CsvFile } from 'src/app/shared/interfaces/csv-file.interface';
import { CsvFileService } from 'src/app/shared/services/csv-file/csv-file.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.scss']
})

/**
 * Import csv file
 * select file
 * select his delimitator
 */
export class CsvImportComponent {
  public onAddCsvFileInstance:()=>void
  public onUpdateCsvFileInstance:()=>void

  csvFile!:CsvFile|null
  projectId!:number

  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  csvDelimiterOptions:Array<string> = [',',';']

  csvForm: FormGroup = new FormGroup({
    file:new FormControl<FileList|undefined>(undefined,[Validators.required]),
    project:new FormControl(undefined,[Validators.required, Validators.required]),
    delimiter:new FormControl(this.csvDelimiterOptions[0]),
  });

  constructor(
    private csvFileService:CsvFileService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.csvFile = this.config.data.csvFile
    this.projectId = this.config.data.projectId

    if(this.csvFile){
      this.csvForm.get('file')?.clearValidators()
      this.csvForm.get('file')?.updateValueAndValidity( {emitEvent:false, onlySelf:true})
      this.csvForm.get('delimiter')?.setValue(this.csvFile.delimiter, {emitEvent:false})
    }

    const onAddCsvFile:Subject<void> = new Subject()
    this.onAddCsvFileInstance = ()=>{
      onAddCsvFile.next()
    }

    const onUpdateCsvFile:Subject<void> = new Subject()
    this.onUpdateCsvFileInstance = ()=>{
      onUpdateCsvFile.next()
    }

    merge(
      onAddCsvFile.pipe(
        filter(()=>this.csvForm.valid),
        switchMap(()=>{
          return this.csvFileService.uploadCSVFile(toFormData({...this.csvForm.value,'file': this.csvForm.get('file')?.value[0]})).pipe(
            catchError(()=>{
              alert("An error occured when uploading file")
              return EMPTY
            })
          )
        })
      ),
      onUpdateCsvFile.pipe(
        filter(()=>this.csvForm.valid),
        switchMap(()=>{
          let value = {...this.csvForm.value}
          if (this.csvForm.get('file')?.value) {
            value = {...this.csvForm.value,'file': this.csvForm.get('file')?.value[0]}
          }else{
            delete value['file']
          }
          return this.csvFileService.updateCSVFile(toFormData(value)).pipe(
            catchError(()=>{
              alert("An error occured when updating file")
              return EMPTY
            })
          )
        })
      )
    ).pipe(
      takeUntil(this.destroyed$),
      tap((csvFile)=>{
        this.csvFile=csvFile
        this.ref.close(csvFile)
      })
    )
    .subscribe()

  }

  ngOnInit(): void {
   
  }

  onClose(){
    this.ref.close(this.csvFile)
  }

  ngAfterViewChecked() {
    if (this.projectId ) {
       this.csvForm.get('project')?.setValue(this.projectId)
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}

export function toFormData( formValue: {[key:string]:string|File}) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}
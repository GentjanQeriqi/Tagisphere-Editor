import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, EMPTY, filter, map, merge, Observable, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { CsvConfiguration, CsvConfigurationPayload, CsvFile, CsvGeotagSchema } from 'src/app/shared/interfaces/csv-file.interface';
import { CsvFileService } from 'src/app/shared/services/csv-file/csv-file.service';
import { EPSGList } from "./EPSGList";
@Component({
  selector: 'app-csv-configurations',
  templateUrl: './csv-configurations.component.html',
  styleUrls: ['./csv-configurations.component.scss']
})
/**
 * COnfigurations of CSV to create tags
 */
export class CsvConfigurationsComponent {

  public onInitInstance:()=>void
  public onAddCsvConfigurationInstance:()=>void
  public onUpdateCsvConfigurationInstance:()=>void
  public onSearchEPSGInstance:(q:string)=>void

  csvFile:CsvFile = this.config.data.csvFile
  EPSGSugetions:Array<number> = EPSGList

  csvConfiguration$:Observable<CsvConfiguration>
  epsgOptions$:Observable<Array<string>>

  csvConfigurationForm: FormGroup = new FormGroup({
    label:new FormControl(undefined,[Validators.required]),
    lat:new FormControl(undefined,[ Validators.required]),
    lng:new FormControl(undefined,[ Validators.required]),
    epsg:new FormControl(4326,[ Validators.required]),
    description:new FormControl(undefined),
    category:new FormControl(undefined),
    subcategory:new FormControl(undefined),
    link:new FormControl(undefined),
  });
  
  constructor(
    private csvFileService:CsvFileService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {


    const onAddCsvConfiguration:Subject<void> = new Subject<void>()
    this.onAddCsvConfigurationInstance = ()=>{
      onAddCsvConfiguration.next()
    }

    const onUpdateCsvConfiguration:Subject<void> = new Subject<void>()
    this.onUpdateCsvConfigurationInstance = ()=>{
      onUpdateCsvConfiguration.next()
    }

    const onInit:ReplaySubject<void> = new ReplaySubject<void>(1)
    this.onInitInstance = ()=>{
      onInit.next()
    }

    const onSearchEPSG:Subject<string> = new Subject<string>()
    this.onSearchEPSGInstance = (q:string)=>{
      onSearchEPSG.next(q)
    }

    this.epsgOptions$ = onSearchEPSG.pipe(
      map((q:string)=>{
        let filtered: string[] = [];
        for (let i = 0; i < EPSGList.length; i++) {
            if (EPSGList[i].toString().toLowerCase().indexOf(q.toLowerCase()) == 0) {
                filtered.push(EPSGList[i].toString());
            }
        }
        return filtered
      })
    )

    this.csvConfiguration$ = merge(
      onInit,
      onAddCsvConfiguration.pipe(
        filter(()=>this.csvConfigurationForm.valid),
        switchMap(()=>{
          this.csvConfigurationForm.disable()
          let data:CsvConfigurationPayload = {
            csv_file:this.csvFile.id,
            srid:this.csvConfigurationForm.get('epsg')?.value,
            geotag_field_map:this.getCsvGeotagSchema()
          }
          return this.csvFileService.defineCSVConfiguration(data).pipe(
            catchError(()=>{
              this.csvConfigurationForm.enable()
              alert("Failed to define configuration")
              return EMPTY
            })
          )
        })
      ),
      onUpdateCsvConfiguration.pipe(
        filter(()=>this.csvConfigurationForm.valid),
        switchMap(()=>{
          this.csvConfigurationForm.disable()
          let data:CsvConfigurationPayload = {
            csv_file:this.csvFile.id,
            srid:this.csvConfigurationForm.get('epsg')?.value,
            geotag_field_map:this.getCsvGeotagSchema()
          }
          return this.csvFileService.updateCSVConfiguration(data).pipe(
            catchError(()=>{
              this.csvConfigurationForm.enable()
              alert("Failed to update configuration")
              return EMPTY
            })
          )
        })
      )
    )
    .pipe(
      switchMap(()=>{
        this.csvConfigurationForm.enable()
        return this.csvFileService.getCSVConfiguration(this.csvFile.id).pipe(
          tap((csvConfiguration)=>{
            this.csvConfigurationForm.get('epsg')?.setValue(csvConfiguration.srid,{emitEvent:false})

            for (const [key, value] of Object.entries(csvConfiguration.geotag_field_map)) {
              if (this.csvConfigurationForm.get(key)) {
                this.csvConfigurationForm.get(key)?.setValue(value,{emitEvent:false})
              }
            }
          }),
          catchError((event:HttpErrorResponse)=>{
            // if (event.status != 404){
            //   alert("Can't find this CSV configuration")
            // }
            return EMPTY
          })
        )
      })
    )


  }

  ngOnInit(){
    this.onInitInstance()
  }

  getCsvGeotagSchema():CsvGeotagSchema{
    return {
      label:this.csvConfigurationForm.get('label')?.value,
      lat:this.csvConfigurationForm.get('lat')?.value,
      lng:this.csvConfigurationForm.get('lng')?.value,
      description:this.csvConfigurationForm.get('description')?.value,
      category:this.csvConfigurationForm.get('category')?.value,
      subcategory:this.csvConfigurationForm.get('subcategory')?.value,
      link:this.csvConfigurationForm.get('link')?.value,
    }
  }

  onClose(){
    this.ref.close()
  }
}

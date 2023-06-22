import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, merge, Observable, pairwise, ReplaySubject, switchMap } from 'rxjs';
import { CsvFile } from 'src/app/shared/interfaces/csv-file.interface';
import { CsvFileService } from 'src/app/shared/services/csv-file/csv-file.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss']
})
/**
 * Table to pre visualize a csv file
 */
export class CsvTableComponent {
  public onInitInstance:()=>void
  public onRetreiveDataInstance:(event:LazyLoadEvent)=>void

  rows:number = 10;

  public updateTable:FormGroup = new FormGroup({
    page_start:new FormControl(0,[Validators.min(0)]),
    page_end:new FormControl(this.rows,[Validators.required]),
  })

  first:number = this.updateTable.get('page_start')?.value;


  csvValues$:Observable<Array<{[key:string]:string|number}>>

  @Input() csvFile!:CsvFile

  totalRecords!:number

  constructor(
    private csvFileService:CsvFileService
  ) {
    const onInit:ReplaySubject<void> = new ReplaySubject<void>(1)
    this.onInitInstance = ()=>{
      onInit.next()
    }

    this.onRetreiveDataInstance = (event)=>{
      this.updateTable.get('page_start')?.setValue( event.first, {emitEvent:false})
      let rows = event.rows != undefined?event.rows:this.rows
      this.updateTable.get('page_end')?.setValue( event.first as number +rows  )
    }

    this.csvValues$ = merge(onInit, this.updateTable.valueChanges).pipe(
      // pairwise(),
      switchMap(()=>{
        return this.csvFileService.readCSVFile(this.csvFile.id, this.updateTable.get('page_start')?.value, this.updateTable.get('page_end')?.value ).pipe(
          catchError(()=>{
            alert("Can't retreive csv file")
            return EMPTY
          })
        )
      })
    )

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes["csvFile"] && this.csvFile) {
      this.totalRecords = this.csvFile.rows_count_db
      this.onInitInstance()
    }
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CsvFile, CsvConfigurationPayload, CsvConfiguration } from '../../interfaces/csv-file.interface';

@Injectable({
  providedIn: 'root'
})
export class CsvFileService {

  private coreUrl = environment.apiCoreUrl;
  constructor(private http: HttpClient) {}


  uploadCSVFile(payload: FormData): Observable<CsvFile> {
    return this.http.post<CsvFile>(`${this.coreUrl}csv/`, payload);
  }

  updateCSVFile(payload: FormData): Observable<CsvFile> {
    return this.http.patch<CsvFile>(`${this.coreUrl}csv/`+payload.get('project')+'/', payload);
  }

  getCSVFileByProjectId(id: number): Observable<CsvFile> {
    return this.http.get<CsvFile>(`${this.coreUrl}csv/`+id+'/');
  }

  readCSVFile(id: number, page_start:number=0, page_end:number=10) {
    return this.http.get<Array<{[key:string]:string|number}>>(`${this.coreUrl}csv/read/`+id+'/?page_start='+page_start+'&page_end='+page_end);
  }
  
  defineCSVConfiguration(payload: CsvConfigurationPayload): Observable<CsvConfiguration> {
    return this.http.post<CsvConfiguration>(`${this.coreUrl}csv/configuration/`, payload);
  }

  updateCSVConfiguration(payload: CsvConfigurationPayload): Observable<CsvConfiguration> {
    let csv_file = payload.csv_file
    let copyPayload = JSON.parse(JSON.stringify(payload))
    delete copyPayload.csv_file
    return this.http.patch<CsvConfiguration>(`${this.coreUrl}csv/configuration/`+csv_file+'/', copyPayload);
  }

  getCSVConfiguration(id:number): Observable<CsvConfiguration> {
    return this.http.get<CsvConfiguration>(`${this.coreUrl}csv/configuration/`+id+'/');
  }


}

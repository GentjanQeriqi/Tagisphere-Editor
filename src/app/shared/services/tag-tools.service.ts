import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tags } from '../interfaces/tags.interface';

@Injectable({
  providedIn: 'root'
})
export class TagToolsService {
  private coreUrl = environment.apiCoreUrl;

  constructor(private http: HttpClient) { }

  getTags(projectId: number): Observable<any>{
    return this.http.get(`${this.coreUrl}tags/project/${projectId}/`).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }

  saveTag(tag: Tags): Observable<any>{
    return this.http.post(`${this.coreUrl}tags/point`, tag).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }

  deleteTag(tagId: number): Observable<any>{
    return this.http.delete(`${this.coreUrl}tags/${tagId}/`).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }

  updateTag(tag: Tags, tagId: number): Observable<any>{
    return this.http.patch(`${this.coreUrl}tags/${tagId}/`, tag).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }

  getCategories(projectId: number): Observable<any>{
    return this.http.get(`${this.coreUrl}categories/project/${projectId}/`).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }

}

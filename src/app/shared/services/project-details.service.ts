import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailsService {
  private coreUrl = environment.apiCoreUrl;
  $details = new BehaviorSubject<any>({});

  constructor(private http: HttpClient){}

  setDetails(details: any) {
    this.$details.next(details);
  }

  addMember(memberObj: any): Observable<any>{
    return this.http.post(`${this.coreUrl}projects/add-member/`, memberObj).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }

}

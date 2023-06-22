import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GoogleLogin, Login, Register } from '../interfaces/userinterface';
import { Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private coreUrl = environment.apiCoreUrl;
  public isLogged: boolean = false;
  private accessToken!: string | null;
  private refreshToken!: string | null;

  constructor(private http: HttpClient, private router: Router) {
    this.accessToken = localStorage.getItem('access');
    this.refreshToken = localStorage.getItem('refresh');
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  googleLogin(googleLoginDetails: GoogleLogin) {
    return this.http
      .post(`${this.coreUrl}auth/google`, googleLoginDetails)
      .pipe(
        catchError((err, caught) => {
          return err;
        })
      );
  }

  login(loginDetails: Login) {
    return this.http.post(`${this.coreUrl}auth/login/`, loginDetails).pipe(
      tap((tokens: any) => {
        this.setAccessToken(tokens.access);
        this.setRefreshToken(tokens.refresh);
        this.router.navigate(['/auth/subscription']);
      }),
      // catchError((err, caught) => {
      //   return err;
      // })
    );
  }

  invitationLogin(loginDetails: Login) {
    return this.http.post(`${this.coreUrl}auth/login/`, loginDetails).pipe(
      tap((tokens: any) => {
        this.setAccessToken(tokens.access);
        this.setRefreshToken(tokens.refresh);
        this.router.navigate(['invitation/accept'], {
          queryParams: {
            invitation: window.localStorage.getItem('invitation'),
          },
        });
      }),
      catchError((err, caught) => {
        return err;
      })
    );
  }

  acceptInvitation(id?: string) {
    return this.http
      .post(`${this.coreUrl}invitation/accept/`, {
        invitation_id: id,
      })
      .pipe(
        tap((tokens: any) => {
          // this.setAccessToken(tokens.access);
          // this.setRefreshToken(tokens.refresh);
        }),
        catchError((err, caught) => {
          return err;
        })
      );
  }

  getOrganizations(): Observable<any> {
    return this.http.get(`${this.coreUrl}organization/`);
  }

  getInvitationById(invitation_id?: string): Observable<any> {
    this.getRefreshToken();
    return this.http
      .get(`${this.coreUrl}invitation/${invitation_id}/`)
      .pipe(tap((next) => {}));
  }

  register(
    registerDetails: Register,
    organizationDetails?: any
  ): Observable<any> {
    return this.http
      .post(`${this.coreUrl}auth/registration/`, registerDetails)
      .pipe(
        tap((tokens: any) => {
          this.setAccessToken(tokens.access);
          this.setRefreshToken(tokens.refresh);
          this.createOrganization(organizationDetails).subscribe((next) => {
            this.router.navigate(['/auth/subscription']);
          });
        }),
        // catchError((err, caught) => {
        //   return err;
        // })
      );
  }

  registerWithoutOrg(
    registerDetails: Register,

  ): Observable<any> {
    return this.http
      .post(`${this.coreUrl}auth/registration/`, registerDetails)
      .pipe(
        tap((tokens: any) => {
          this.setAccessToken(tokens.access);
          this.setRefreshToken(tokens.refresh);
          
        }),
        // catchError((err, caught) => {
        //   return err;
        // })
      );
  }

  createOrganization(organizationDetails: any): Observable<any> {
    return this.http
      .post(`${this.coreUrl}organization/`, organizationDetails)
      .pipe(
        tap((next: any) => {}),
        catchError((err, caught) => {
          return err;
        })
      );
  }

  logOut(): Observable<any> {
    this.router.navigate(['/auth']);
    return this.http.post(`${this.coreUrl}auth/logout/`, { detai: '' }).pipe(
      tap((result: any) => {
        localStorage.clear();
        this.setAccessToken(null);
        this.setRefreshToken(null);
        this.router.navigate(['/auth']);
      }),
      catchError((err, caught) => {
        return err;
      })
    );
  }

  public getRefreshToken(): Observable<any> {
    const refresh = {
      refresh: this.refreshToken,
    };
    return this.http
      .post(`${this.coreUrl}auth/token/refresh/`, refresh)
      .pipe(
        tap((tokens: any) => {
          this.setAccessToken(tokens.access);
          localStorage.setItem('access', tokens.access);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error);
        })
      );
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public setRefreshToken(token: string | null) {
    this.refreshToken = token;
    token ? localStorage.setItem('refresh', token) : null;
  }

  public setAccessToken(token: string | null) {
    this.accessToken = token;
    token ? localStorage.setItem('access', token) : null;
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.coreUrl}profile/me`).pipe(
      tap((result: any) => {}),
      catchError((err, caught) => {
        return err;
      })
    );
  }


}

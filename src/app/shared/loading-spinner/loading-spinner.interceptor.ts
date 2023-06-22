import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from './loading-spinner.service';



@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    public loadingSpinner: LoadingSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.loadingSpinner.spinner$.subscribe();
    return next
      .handle(req)
      .pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }

}
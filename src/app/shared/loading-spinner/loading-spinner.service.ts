import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { defer, NEVER, finalize, share } from 'rxjs';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private overlayRef?: OverlayRef = undefined;

  constructor(private readonly overlay: Overlay) {}

  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  private show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(LoadingSpinnerComponent));
    });
  }

  private hide(): void {
    this.overlayRef?.detach();
    this.overlayRef = undefined;
  }
}

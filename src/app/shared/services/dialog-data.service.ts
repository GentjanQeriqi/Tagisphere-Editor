import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogDataService {
  $dialogData = new BehaviorSubject({});

  setDialogData = (data: any) => {
    this.$dialogData.next(data);
  };
}

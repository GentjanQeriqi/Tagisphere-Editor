import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  $collapsed = new BehaviorSubject<boolean>(false);

  setCollapsed(collapsed: boolean) {
    this.$collapsed.next(collapsed);
  }
}
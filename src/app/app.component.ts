import { Component, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig){
    this.primengConfig.ripple = true;
  }
}

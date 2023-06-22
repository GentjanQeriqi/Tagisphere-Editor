import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FOOTER_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  FOOTER_WORDS = FOOTER_WORDS;

  screenWidth: number = 0;
  isDesktop = this.screenWidth > 428;

  constructor() {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
}

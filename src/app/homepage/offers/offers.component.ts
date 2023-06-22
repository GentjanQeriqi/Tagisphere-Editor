import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { OFFERS_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class OffersComponent {
  OFFERS_WORDS = OFFERS_WORDS;
  screenWidth: number = 0;
  isDesktop = this.screenWidth > 428;

  showDetailsFree: boolean = false;
  showDetailsBasic: boolean = false;
  showDetailsPro: boolean = false;
  showDetailsDedicative: boolean = false;
  showSelfHosted: boolean = false;
  constructor() {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }

  toggleShowDetailsFree() {
    this.showDetailsFree = !this.showDetailsFree;
  }

  toggleShowDetailsBasic() {
    this.showDetailsBasic = !this.showDetailsBasic;
  }

  toggleShowDetailsPro() {
    this.showDetailsPro = !this.showDetailsPro;
  }

  toggleShowDetailsDedicative() {
    this.showDetailsDedicative = !this.showDetailsDedicative;
  }

  toggleSelfHosted() {
    this.showSelfHosted = !this.showSelfHosted;
  }
}

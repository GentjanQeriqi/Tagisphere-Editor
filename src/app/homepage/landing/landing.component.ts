import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ERROR_WORDS, LANDING_PAGE_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  @ViewChild('myVideo') myVideo: ElementRef | undefined;

  LANDING_WORDS = LANDING_PAGE_WORDS;
  ERROR_WORDS = ERROR_WORDS;

  showVideo: boolean = false;
  constructor() {
    this.getScreenSize();
  }

  ngOnInit(): void {}

  screenWidth: number = 0;
  isDesktop = this.screenWidth > 428;

  playVideo() {
    this.showVideo = true;
    setTimeout(() => {
      this.myVideo?.nativeElement.play();
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
}

import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FORGOT_PASSWORD_WORDS } from 'src/app/app.constants';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)',
        }),
        animate(400),
      ]),
    ]),
  ],
})
export class PasswordResetComponent {
  FORGOT_PASSWORD_WORDS = FORGOT_PASSWORD_WORDS;

  screenWidth: number = 0;
  step: number = 1;
  slideIn: boolean = false;
  showPassword: boolean = false;
  hasLetters: boolean = true;
  hasNumbers: boolean = false;
  hasEightCharacters: boolean = false;
  passwordCreated: boolean = false;
  showModal: boolean = false;
  emailSent: boolean = false;
  selectedIndex: number = 0;
  emailVerified: boolean = false;

  constructor(private router: Router) {
    this.getScreenSize();
  }

  resetPassword() {
    this.emailSent = !this.emailSent;

    this.emailVerified = false;
  }

  goBackToLogin() {
    this.router.navigate(['/auth/signin']);
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

  createNewPassword() {
    this.passwordCreated = !this.passwordCreated;
  }

  closeModal() {
    this.passwordCreated = !this.passwordCreated;
  }

  nextCarouselStep(index: number) {
    this.selectedIndex = index;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
}

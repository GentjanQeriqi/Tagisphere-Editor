import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_WORDS } from 'src/app/app.constants';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService],
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
export class SignInComponent implements OnInit {
  LOGIN_WORDS = LOGIN_WORDS;

  screenWidth: number = 0;
  step: number = 1;
  slideIn: boolean = false;
  selectedIndex: number = 0;
  hide: boolean = true;
  singInForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loadingSpinner: LoadingSpinnerService, private messageService: MessageService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/main'])
    }
    this.buildForm();
  }

  buildForm() {
    this.singInForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  nextCarouselStep(index: number) {
    this.selectedIndex = index;
  }

  submitForm() {
    if(this.singInForm.valid){
      const loader = this.loadingSpinner.spinner$.subscribe();
    this.authService.login(this.singInForm.value).subscribe( next => {
      loader.unsubscribe();
    }, err => {
      
      loader.unsubscribe();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.non_field_errors[0]  });
    })
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
}

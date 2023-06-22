import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Params, Router } from '@angular/router';
import { LOGIN_WORDS } from 'src/app/app.constants';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class InvitationComponent {
  screenWidth: number = 0;
  LOGIN_WORDS = LOGIN_WORDS;
  hide: boolean = true;
  invitationForm: FormGroup = new FormGroup({});
  params: Params = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingSpinner: LoadingSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.params = this.router.parseUrl(this.router.url).queryParams;
    console.log(this.params);
  }

  submitForm() {
    if (this.invitationForm.valid) {
      const loader = this.loadingSpinner.spinner$.subscribe();
      this.authService
        .invitationLogin(this.invitationForm.value)
        .subscribe((next) => {
          loader.unsubscribe();
        });
    }
  }

  buildForm() {
    this.invitationForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
}

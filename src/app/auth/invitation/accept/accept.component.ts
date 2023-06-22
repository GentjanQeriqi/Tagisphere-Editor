import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Params, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Me } from 'src/app/shared/interfaces/me.interface';
import { Organization } from 'src/app/shared/interfaces/organization.interface';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss'],
})
export class AcceptComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  params: Params = {};
  timeout: number = 5;
  isLoggedIn: boolean = true;
  invitedOrganization: any = {};
  errorMessage = '';
  hasError: boolean = false;
  userExists: boolean = true;
  me!: Me;
  invitationId?: string;
  invitationRegisterForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;

  constructor(private authService: AuthService, public router: Router,  private fb: FormBuilder) {
    this.invitationId = this.router.parseUrl(this.router.url).queryParams['invitation']
  }

  @ViewChild('countdown', { static: true })
  countdown!: ElementRef;

  ngOnInit(): void {
    this.checkInvitation();
    this.buildForm();
   // this.getInvitation();
  }

  buildForm(){
    this.invitationRegisterForm = this.fb.group({
      email: new FormControl(null),
      password1: new FormControl(null),
      password2: new FormControl(null)
    })
  }

  checkInvitation(){
    this.authService.getMe().subscribe({
      next: (next) => {
        this.me = next;
      },
    });
    this.params = this.router.parseUrl(this.router.url).queryParams;
    if (!this.authService.isLoggedIn()) {
      this.isLoggedIn = false;
      window.localStorage.setItem('invitation_id', this.params['invitation']);
    } else {
      if (!window.localStorage.getItem('invitation_id')) {
        window.localStorage.setItem('invitation_id', this.params['invitation']);
      }
      this.isLoggedIn = true;
      this.authService.getInvitationById(this.invitationId).subscribe({
        next: (next) => {
          if (next) {
            this.invitedOrganization = next;
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error.detail;
          this.hasError = true;
          window.localStorage.removeItem('invitation_id');
        },
      });
    }
    this.authService.getOrganizations().subscribe({
      next: (next) => {
        next.forEach((org: Organization) => {
          org.pending_invitations.forEach((member) => {
            if (this.me.display_name !== member.email) {
              this.userExists = false;
              this.errorMessage =
                'User email does not match invited user email.';
              return;
            }
            this.userExists = true;
            this.errorMessage = '';
          });
        });
      },
    });
  }

  acceptInvitation() {
    this.authService.acceptInvitation(this.invitationId).subscribe({
      next: () => {
        this.hasError = false;
        window.localStorage.removeItem('invitation_id');
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.error(err);
        this.hasError = true;
        this.errorMessage = err.error.detail;
        window.localStorage.removeItem('invitation_id');
      },
    });
  }

  goBackToLogin() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

  register(){
    this.authService.registerWithoutOrg(this.invitationRegisterForm.value).subscribe(next => {
      this.isLoggedIn = true
      this.checkInvitation();  
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

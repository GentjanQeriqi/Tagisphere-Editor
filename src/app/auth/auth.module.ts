import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PrimeNgModule } from '../shared/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CompanyLocationComponent } from './sign-up/company-location/company-location.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    PasswordResetComponent,
    SubscriptionComponent,
    CompanyLocationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
  ],
})
export class AuthModule {}

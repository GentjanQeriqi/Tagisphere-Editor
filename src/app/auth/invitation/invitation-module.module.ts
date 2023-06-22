import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitationModuleRoutingModule } from './invitation-module-routing.module';
import { InvitationComponent } from './login/login.component';
import { AcceptComponent } from './accept/accept.component';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InvitationComponent, AcceptComponent],
  imports: [
    CommonModule,
    InvitationModuleRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class InvitationModuleModule { }

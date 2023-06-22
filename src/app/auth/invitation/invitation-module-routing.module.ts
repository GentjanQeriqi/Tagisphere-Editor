import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptComponent } from './accept/accept.component';
import { InvitationComponent } from './login/login.component';

const routes: Routes = [
  {path: 'accept', component: AcceptComponent},
  {path: 'login', component: InvitationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationModuleRoutingModule { }

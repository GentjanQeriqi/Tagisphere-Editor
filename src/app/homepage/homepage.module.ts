import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { OffersComponent } from './offers/offers.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { SupportComponent } from './support/support.component';
import { FooterComponent } from './footer/footer.component';
import { PrimeNgModule } from '../shared/primeng.module';



@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    LandingComponent,
    AboutComponent,
    OffersComponent,
    FeedbacksComponent,
    SupportComponent,
    FooterComponent,
    
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    PrimeNgModule
    
    
  ]
})
export class HomepageModule { }

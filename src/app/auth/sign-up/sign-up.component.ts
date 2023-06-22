import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SIGN_UP_WORDS } from 'src/app/app.constants';
import { OrgLocation } from './company-location/company-location.component';
import { BusinessTypeEnum } from 'src/app/shared/interfaces/business-type.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent implements OnInit {
  SIGN_UP_WORDS = SIGN_UP_WORDS;

 
  businessType: BusinessTypeEnum[] = [
    BusinessTypeEnum.CIVIL_INFRASTRUCTURE,
    BusinessTypeEnum.CONSTRUCTION,
    BusinessTypeEnum.ENERGY,
    BusinessTypeEnum.ENGINEERING_ARCHITECTURE,
    BusinessTypeEnum.GOVERNMENT,
    BusinessTypeEnum.MANUFACTURING,
    BusinessTypeEnum.OIL_GAS,
    BusinessTypeEnum.PHARMACEUTICAL,
    BusinessTypeEnum.SURVEY_GEOSPATIAL,
    BusinessTypeEnum.TELECOMMUNICATIONS,
    BusinessTypeEnum.OTHER
  ]

  businessSize = [
    '1-10',
    '11-50',
    '51-100',
    '101-500',
    '500+'
  ]
  screenWidth: number = 0;
  step: number = 1;
  selectedIndex: number = 0;
  registerForm: FormGroup = new FormGroup({});
  organizationForm: FormGroup = new FormGroup({})

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private messageService: MessageService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/main'])
    }
    this.buildForm();
    this.organizationForm.valueChanges.subscribe(next => {

    })
  }

  buildForm() {
    this.registerForm = this.fb.group({
      username: new FormControl(null),
      email: new FormControl(null),
      password1: new FormControl(null),
      password2: new FormControl(null),
    });
    this.organizationForm = this.fb.group({
      name: new FormControl(null),
      size: new FormControl('1-10'),
      // location: new FormGroup({
      //   type: new FormControl(null),
      //   coordinates: new FormControl([null, null])
      // }),
      business_type: new FormControl('Civil Infrastructure'),
      other_business_type: new FormControl('')
    });
  }

  goBack() {
    if (this.step === 1) {
      return;
    }
    this.step -= 1;
  }

  submitRegister() {
    this.authService.register(this.registerForm.value, this.organizationForm.value).subscribe((next) => {

    }, err => {
      for (const key in err.error) {
        if (Object.prototype.hasOwnProperty.call(err.error, key)) {
          // console.log(`Key: ${key}`);
          // console.log(`Value: ${err.error[key]}`);
          this.messageService.add({ severity: 'error', summary: key, detail: err.error[key]  });
        }
      }
     
    
    
    });
  }

  nextCarouselStep(index: number) {
    this.selectedIndex = index;
  }

  goToNextStep() {
    this.step += 1;
    if(this.step === 2){
      setTimeout(() => {
       
      }, 50);
    }
  }

  getOrganizationLocation(event: OrgLocation){
    this.organizationForm.patchValue({
      location: event
    });
    console.log(this.organizationForm.value);
    
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.screen.width;
  }
      
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, EMPTY, filter, Observable, ReplaySubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProjectEnums } from 'src/app/enums/ProjectEnums';
import { CreateProjectInputs } from 'src/app/shared/interfaces/createproject.interface';
import { Organization } from 'src/app/shared/interfaces/organization.interface';
import { DialogDataService } from 'src/app/shared/services/dialog-data.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss'],
})
export class NewProjectDialogComponent implements OnInit {


  surveyorsDialog: boolean = false;
  surveyorForm: FormGroup = new FormGroup({});
  organisations$!:Observable<Organization[]>

  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(
    private dialogService: DialogService,
    private router: Router,
    private dialogDataService: DialogDataService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private loader: LoadingSpinnerService
  ) {

   

  }

  ngOnInit(): void {
    this.buildForm();
    this.getOrganization()
  }


  buildForm(){
    this.surveyorForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      organization: new FormControl(null),
      is_public: new FormControl(true, [Validators.required]),
      type:new FormControl(ProjectEnums.SURVEYOR, [Validators.required])
    });
  }


  getOrganization(){
    this.dashboardService.getOrganizations().subscribe(next => {
      this.surveyorForm.patchValue({organization: next[0].id});
    });
  }

  onCreateProjectInstance() {
    const loadingSpinner = this.loader.spinner$.subscribe();
    if(this.surveyorForm.valid){
      this.dashboardService.addNewProject(this.surveyorForm.value as CreateProjectInputs).subscribe( next => {
        this.dialogDataService.setDialogData(this.surveyorForm.value);
        this.dialogService.dialogComponentRefMap.forEach((el) => {
          el.destroy();
          this.router.navigate(['main/details/surveyors/'+next.id]);
          loadingSpinner.unsubscribe()
        });
      })
    }

    // const onCreateProject:Subject<void> = new Subject<void>()
    // this.onCreateProjectInstance = ()=>{
    //   onCreateProject.next()
    // }

    // onCreateProject.pipe(
    //   takeUntil(this.destroyed$),
    //   filter(()=>this.surveyorForm.valid == true),
    //   switchMap(()=>{
    //     console.log(this.surveyorForm, this.surveyorForm.valid)
    //     return  this.dashboardService
    //     .addNewProject(this.surveyorForm.value as CreateProjectInputs)
    //     .pipe(
    //       tap((project)=>{
    //         this.dialogDataService.setDialogData(this.surveyorForm.value);
    //         this.dialogService.dialogComponentRefMap.forEach((el) => {
    //           el.destroy();
    //         });
    //         this.router.navigate(['main/surveyors-toolbox/'+project.id]);
    //       }),
    //       catchError(()=>{
    //         alert("Can't create your project")
    //         return EMPTY
    //       })
    //     )
    //   })
    // ).subscribe()
  }
  

    


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  goBack() {
    this.surveyorsDialog = false;
  }


  selectProject(projectType: string) {
    switch (projectType) {
      case 'surveyors': {
        this.surveyorsDialog = true;
      }
    }
  }

  setDialogData = (data: { name: string; description: string }) => {
    this.dialogDataService.setDialogData(data);
  };
}


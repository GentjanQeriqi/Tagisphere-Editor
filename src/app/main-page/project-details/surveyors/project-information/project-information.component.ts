import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

import * as mapboxgl from 'mapbox-gl';
import { Roles } from 'src/app/shared/interfaces/roles.interface';

import { Project } from 'src/app/shared/interfaces/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, filter, map, merge, Observable, shareReplay, Subject, Subscribable, Subscription, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { DashboardService } from 'src/app/main-page/dashboard/dashboard.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CsvFile } from 'src/app/shared/interfaces/csv-file.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { CsvConfigurationsComponent } from 'src/app/main-page/project-details/surveyors/project-information/csv-import/csv-configurations/csv-configurations.component';
import { CsvFileService } from 'src/app/shared/services/csv-file/csv-file.service';
import { CsvImportComponent } from './csv-import/csv-import.component';

@Component({
  selector: 'project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInformationComponent implements OnInit, AfterViewInit {


  dialogVisible: boolean = false;
  inviteUser: boolean = false;
  inviteUserForm: FormGroup = new FormGroup({})
  roles: Roles[] = [];
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 26.3398;
  lng = -81.7787;
  projectForm: FormGroup = new FormGroup({});
  emails: any[] = []
  project$!:Observable<Project>
  projectDetails!: Project;
  csvFile$!:Observable<CsvFile>



  ngAfterViewInit(): void {
    this.initMap(); 
   }


  ngOnInit(): void {
    //get the id before project
    this.getSidenav$();
    this.buildForms();
    this.getRoles()
  }

  getOrganization() {
    this.dashboardService.getOrganizations().subscribe((next: any) => {
     next[0].members.forEach((member: any) => {
        if (member.role === 'Member' && !this.projectDetails.members.some((obj: any) => obj.user === member.user)) {
            this.emails.push(member)
        } 
      }); 
    });
  }

  onInviteMemberInstance(project: Project){
    let memberPayload: any = {
      role: this.inviteUserForm.get('role')?.value?.value ? this.inviteUserForm.get('role')?.value.value : Roles.ADMIN ,
      user: this.inviteUserForm.get('email')?.value?.user,
      // project:project.id
    }
      this.dashboardService.addProjectMember(memberPayload, this.projectDetails.id).subscribe(next => {
        console.log(next);
        this.projectDetails.members.push(next);
        this.inviteUser = false
      })
  }

  buildForms(){
    this.projectForm = this.fb.group({
      name: new FormControl(null),
      description: new FormControl(null),
    });

    this.inviteUserForm = this.fb.group({
      role: new FormControl(Roles.ADMIN, Validators.required),
      email: new FormControl(null, [Validators.required]),
    });
  }
  getRoles() {
    const url = this.router.parseUrl(this.router.url)
    const id = url.root.children['primary'].segments[3]
    this.dashboardService.getProjectRoles(Number(id)).subscribe((next: any) => {
      this.roles = next.actions.POST.role.choices
    })
  }

  updateForms(prjectDetails: Project){
    if(prjectDetails){
    this.projectForm.patchValue({
      name: this.projectDetails.name ? prjectDetails.name : null,
      description: this.projectDetails.description ? prjectDetails.description : null
    })
  }
  }

  inviteUserDialog() {
    this.inviteUser = !this.inviteUser;
    this.emails = [];
    this.getOrganization();
  }


  showDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  getSidenav$() {
    this.sidenavService.$collapsed.subscribe((next) => {});
  }

  initMap() {
    mapboxgl as typeof mapboxgl;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoibWF2ZXJpY2tzLWRldiIsImEiOiJjbGdpYTZsbnUwM2N4M2NvYjdmczNwaWhyIn0.ZmEPtsJC2ch7sju_c75Sow',
      container: 'map',
      style: this.style,
      zoom: 2,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    const southWest = new mapboxgl.LngLat(this.lng, this.lat);
    const northEast = new mapboxgl.LngLat(this.lng + 2, this.lat + 2);
    const boundingBox = new mapboxgl.LngLatBounds(southWest, northEast);
  }

// ====================================================================================================================================================================================================================


public onHandleCsvFileInstance:(csvFile:CsvFile|null)=>void
  
constructor(
    public sidenavService: SidenavService,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public router: Router,
    private actRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private csvFileService:CsvFileService,
    public dialogService: DialogService, 
  ) { 

     // get the id from 3rd url segment
     const url = this.router.parseUrl(this.router.url)
     const id = url.root.children['primary'].segments[3]
     this.project$ = this.dashboardService.getProjectById(Number(id)).pipe(
         tap( (next) => {
           this.projectDetails = next;
           this.updateForms(this.projectDetails)
           this.cd.detectChanges();
         })
     )

    const onHandleCsvFile:Subject<CsvFile|null> = new Subject()

    this.onHandleCsvFileInstance = (csvFile)=>{
      onHandleCsvFile.next(csvFile)
    }

    this.csvFile$ =  merge(
      this.project$.pipe(map((project)=>project.id)),
      onHandleCsvFile.pipe(
        withLatestFrom(this.project$),
        switchMap(([csvFile, project])=>{

          let ref = this.dialogService.open(CsvImportComponent, {
            width: 'auto',
            style:{ width: 'auto', maxWidth:'90%', height: 'auto'},
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: false,
            data:{'csvFile':csvFile, 'projectId':project.id},
            header:csvFile?'Update .CSV/.XLSX ':'Upload .CSV/.XLSX'
          });
  
          return ref.onClose.pipe(
            filter((newCsvFile:CsvFile)=>newCsvFile!= undefined),
            switchMap((newCsvFile:CsvFile)=>{
                 let ref = this.dialogService.open(CsvConfigurationsComponent, {
                    width: 'auto',
                    style:{ width: 'auto', maxWidth:'90%', height: 'auto'},
                    contentStyle: { overflow: 'auto' },
                    baseZIndex: 10000,
                    maximizable: false,
                    data:{'csvFile':newCsvFile},
                    header:'Define CSV configurations'
                });

                return ref.onClose.pipe(
                  map(()=> newCsvFile.project)
                )
            
            })
          )
        })
      )
      )
    .pipe(
      shareReplay(1),
      switchMap((projectId)=>{
        return this.csvFileService.getCSVFileByProjectId(projectId).pipe(
          catchError(()=>{
            return EMPTY
          })
        )
      })
    )
  
  }
}

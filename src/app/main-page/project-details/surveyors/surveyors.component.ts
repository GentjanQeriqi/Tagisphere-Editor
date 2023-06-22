import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectEnums } from 'src/app/enums/ProjectEnums';
import { Organization } from 'src/app/shared/interfaces/organization.interface';
import { Roles } from 'src/app/shared/interfaces/roles.interface';
import { ProjectDetailsService } from 'src/app/shared/services/project-details.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { ProjectMemberPayload } from 'src/app/shared/interfaces/projectmember.interface';
import { Project } from 'src/app/shared/interfaces/project.interface';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-surveyors',
  templateUrl: './surveyors.component.html',
  styleUrls: ['./surveyors.component.scss'],
})
export class SurveyorsComponent {
 

  tutorials = [
    {
      label: 'Queue',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Circularly LinkedList',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Doubly LinkedList',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Singly LinkedList',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Doubly Ended Queue',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Binary Search Tree',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Red Black Tree',
      color: 'success',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Breadth First Search',
      color: 'warning',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: "Floyd's Cycle",
      color: 'info',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Travelling Salesman Problem',
      color: 'info',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'Bellman Ford',
      color: 'warning',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
    {
      label: 'KMP info',
      color: 'String',
      icon: 'assets/images/yelp.png',
      subcategories: [
        { label: 'Point', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Place', color: 'warning', icon: 'assets/images/yelp.png' },
        { label: 'Quest', color: 'info', icon: 'assets/images/yelp.png' },
      ],
    },
  ];

  cols = [
    { field: 'label', header: 'Label' },
    { field: 'color', header: 'Color' },
    { field: 'icon', header: 'Icon' },
  ];

  detailIcons = [
    { icon: 'assets/images/LocationPin.png', name: 'Map pin' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/LocationPin.png', name: 'Map pin' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/LocationPin.png', name: 'Map pin' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
    { icon: 'assets/images/YelpBig.png', name: 'Yelp' },
    { icon: 'assets/images/MapPin2.png', name: 'Map pin #2' },
    { icon: 'assets/images/BusStop.png', name: 'Bus stop' },
  ];

  sortBy = ['Name'];

  projectDetails!: Project;
  subscriptions: Subscription[] = [];
  isAccordionOpen: boolean = false;
  projectId = this.router.snapshot.paramMap.get('id');
  updateModal: boolean = false;
  organizations!: Organization[];
  projectTypes = Object.values(ProjectEnums);
  checked: boolean = false;
  selectedOrganization: any = {};
  organization!: Organization;
  inviteUser: boolean = false;
  inviteUserForm: FormGroup = new FormGroup({});
  updateProjectForm: FormGroup = new FormGroup({});
  roles: Roles[] = [Roles.ADMIN, Roles.MEMBER, Roles.OWNER];
  emails: any[] = []

  constructor(
    public projectDetailsService: ProjectDetailsService,
    public sidenavService: SidenavService,
    private dashboardService: DashboardService,
    public router: ActivatedRoute,
    private fb: FormBuilder,
    private loadingSpinner: LoadingSpinnerService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getRoles();
    const spinner = this.loadingSpinner.spinner$.subscribe();
    if(this.projectId){
    this.subscriptions.push(
      this.dashboardService
        .getProjectById(+this.projectId)
        .subscribe((data) => {
          this.projectDetails = data;
          this.updateProjectForm.patchValue({
            name: this.projectDetails.name,
            organization: this.selectedOrganization,
            type: this.projectDetails.type,
            is_public: this.projectDetails.is_public,
            description: this.projectDetails.description,
          });
          spinner.unsubscribe()
        })
        
    );
  }
    this.getRoles();
  }

  toggleUpdateModal() {
    this.getOrganization();
    this.updateModal = !this.updateModal;
  }

  getRoles() {
    this.dashboardService.getProjectRoles(Number(this.projectId)).subscribe(next => {
      this.roles = next.actions.POST.role.choices
    })
  }

  buildForm() {
    this.updateProjectForm = this.fb.group({
      name: new FormControl(null, [Validators.nullValidator]),
      organization: new FormControl(null, [Validators.nullValidator]),
      type: new FormControl(null, [Validators.nullValidator]),
      is_public: new FormControl(null, [Validators.nullValidator]),
      description: new FormControl(null, [Validators.nullValidator]),
    });
    this.inviteUserForm = this.fb.group({
      role: new FormControl(Roles.ADMIN, Validators.required),
      email: new FormControl(null, [Validators.required]),
    });
  }

  updateProjectData() {
    if(this.projectId){
    this.dashboardService
      .updateProjectInformation(+this.projectId, {
        name: this.updateProjectForm.get('name')?.value,
        organization: this.updateProjectForm.get('organization')?.value.id,
        description: this.updateProjectForm.get('description')?.value,
        is_public: this.updateProjectForm.get('is_public')?.value,
        type: this.updateProjectForm.get('type')?.value,
      })
      .subscribe((next) =>{
        if(this.projectId){
        this.dashboardService
          .getProjectById(+this.projectId)
          .subscribe((next) => {
             this.projectDetails = next
    })}
  }
      );
    }
    this.updateModal = false;
  }

  setAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  getOrganization() {
    this.dashboardService.getOrganizations().subscribe((next) => {
      this.organizations = next;
      this.selectedOrganization = next[0];
      this.selectedOrganization.members.forEach((member: any) => {
        if (member.role === 'Member' && !this.projectDetails?.members.some((obj: any) => obj.user === member.user)) {
            this.emails.push(member)
          } 
      }); 
    });
  }

  getProjectMembers(){
    this.dashboardService.getProjectMembers(Number(this.projectId)).subscribe(next => {
      
    })
  }

  inviteUserDialog() {
    this.getOrganization();
    this.inviteUser = !this.inviteUser;
  }


  submitUserForm() {
    if (this.inviteUserForm.valid) {
      this.inviteUser = false;
    }
    const userInvitationObject: any = {
      role: this.inviteUserForm.get('role')?.value.value,
      user: this.inviteUserForm.get('email')?.value.user,
      // project: Number(this.projectId)
    };
    this.projectDetails?.members.push(userInvitationObject);
    this.dashboardService.addProjectMember(userInvitationObject, Number(this.projectId)).subscribe(next => {

    })
  }
  
  inviteDialogHide(){
    this.emails = [];
  }

  navigateToProjectInfo(event: any){
    console.log(event)
    switch(event.index){
      case 0: {
        this.routing.navigate([ `main/details/surveyors/${this.projectId}/project-information`])
        break;
      }
      case 1: {
        this.routing.navigate([ `main/details/surveyors/${this.projectId}/tag-tools`])
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

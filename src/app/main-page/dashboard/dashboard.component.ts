import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MAIN_PAGE_WORDS } from 'src/app/app.constants';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectDetailsService } from 'src/app/shared/services/project-details.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { NewProjectDialogComponent } from '../dialogs/new-project-dialog/new-project-dialog.component';
import { DashboardService } from './dashboard.service';
import { Member, Project } from 'src/app/shared/interfaces/project.interface';
import { Roles } from 'src/app/shared/interfaces/roles.interface';
import { Organization } from 'src/app/shared/interfaces/organization.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DashboardComponent {
  MAIN_PAGE_WORDS = MAIN_PAGE_WORDS;

  items: MenuItem[] = [];

  inviteUser: boolean = false;

  inviteUserForm: FormGroup = new FormGroup({});

  selectedProjects: any;

  paginationRows: number[] = [5, 10, 20, 50, 100];
  selectedPaginationRowNumber: number = this.paginationRows[0];

  sidebarMenu = [
    {
      label: MAIN_PAGE_WORDS.DASHBOARD,
      icon: 'assets/images/DashboardIcon.png',
      notifications: 0,
    },
    {
      label: MAIN_PAGE_WORDS.PROJECTS,
      icon: 'assets/images/ProjectsIcon.png',
      notifications: 6,
    },
    {
      label: MAIN_PAGE_WORDS.USERS,
      icon: 'assets/images/UsersIcon.png',
      notifications: 12,
    },
    {
      label: MAIN_PAGE_WORDS.COMPANY_SETTINGS,
      icon: 'assets/images/CompanySettingsIcon.png',
      notifications: 0,
    },
  ];

  selectedMenu = this.sidebarMenu[0];

  selectedMember: any;
  projects!: Project[];
  roles: Roles[] = [];
  members!: Member[];
  allMembers: any[] = [];
  organizations!: Organization[];

  constructor(
    public sidenavService: SidenavService,
    private dialogService: DialogService,
    public projectDetailsService: ProjectDetailsService,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getSidenav$();
    this.buildForm();
    this.getProjects();
    this.getMembers();
    this.getInvitations();
    this.getOrganizations();
  }

  getSidenav$() {
    this.sidenavService.$collapsed.subscribe((next) => {});
  }

  buildForm() {
    this.inviteUserForm = this.fb.group({
      role: new FormControl(Roles.ADMIN, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      organization: new FormControl(null, Validators.required),
    });
  }

  inviteUserDialog() {
    this.inviteUser = !this.inviteUser;
  }

  newProjectDialog() {
    const dialogRef = this.dialogService.open(NewProjectDialogComponent, {});
  }

  getProjects() {
    this.dashboardService.getProjects().subscribe((next) => {
      this.projects = next;
      this.getRoles()
    });
  }

  getMembers() {
    this.dashboardService.getOrgMembers().subscribe((next) => {
      this.members = next;
    });
  }

  getInvitations() {
    this.dashboardService.getInvitations().subscribe((next) => {});
  }


  getRoles(){
    this.dashboardService.getOrganizationRoles().subscribe(next => {
      this.roles = next.actions.POST.role.choices
    })
  }

  getOrganizations() {
    this.dashboardService.getOrganizations().subscribe((next) => {
      this.organizations = next;
      this.organizations.forEach((element) => {
        this.allMembers.push(
          ...element.pending_invitations,
          ...element.members
        );
      });
    });
  }
}

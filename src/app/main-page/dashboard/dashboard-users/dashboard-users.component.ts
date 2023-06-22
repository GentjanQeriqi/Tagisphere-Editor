import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MAIN_PAGE_WORDS } from 'src/app/app.constants';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { NewProjectDialogComponent } from '../../dialogs/new-project-dialog/new-project-dialog.component';
import { Organization } from 'src/app/shared/interfaces/organization.interface';
import { Member, Project } from 'src/app/shared/interfaces/project.interface';
import { Roles } from 'src/app/shared/interfaces/roles.interface';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.scss'],
})
export class DashboardUsersComponent implements OnInit {
  searchFilter: FormControl = new FormControl('');

  MAIN_PAGE_WORDS = MAIN_PAGE_WORDS;
  paginationRows: number[] = [5, 10, 20, 50, 100];
  selectedPaginationRowNumber: number = this.paginationRows[0];

  inviteUserForm: FormGroup = new FormGroup({});

  selectedMember: any;
  @Input() roles: Roles[] = [];
  organizationId?: number;
  // @Input() members!: Member[];
  @Input() allMembers: any[] = [];
  @Input() organizations!: Organization[];
  inviteUser: boolean = false;
  @Input() projects!: Project[];

  constructor(
    public sidenavService: SidenavService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.getSidenav$();
    this.buildForm();

    // this.getOrganizations()
  }


  buildForm() {
    this.inviteUserForm = this.fb.group({
      role: new FormControl(Roles.ADMIN, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      organization: new FormControl(null),
    });
  }

  inviteUserDialog() {
    this.inviteUser = !this.inviteUser;
  }

  getSidenav$() {
    this.sidenavService.$collapsed.subscribe((next) => {});
  }

  newProjectDialog() {
    const dialogRef = this.dialogService.open(NewProjectDialogComponent, {});
  }

  submitForm() {
    if (this.inviteUserForm.valid) {
      this.inviteUser = false;
    }
    const userInvitationObject = {
      role: this.inviteUserForm.get('role')?.value.value,
      email: this.inviteUserForm.get('email')?.value,
      organization: this.organizations[0].id
    };
    this.dashboardService.inviteUser(userInvitationObject).subscribe((next) => {

      this.allMembers.push(next);
    });
  }

  patchOrganizationField(org: Organization) {
    console.log(org);
  }

  // getOrganizations(){
  //   this.dashboardService.getOrganizations().subscribe(next => {
  //       this.organizations = next;
  //       this.organizations.forEach(element => {

  //         this.allMembers.push(...element.pending_invitations, ... element.members);
  //       })
  //   })
  // }
}

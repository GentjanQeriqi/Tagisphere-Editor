import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAIN_PAGE_WORDS } from '../app.constants';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { SidenavService } from '../shared/services/sidenav.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog/new-project-dialog.component';
import { Subscription, filter, forkJoin, map } from 'rxjs';
import { Me } from '../shared/interfaces/me.interface';
import { ProjectDetailsService } from '../shared/services/project-details.service';
import { LoadingSpinnerService } from '../shared/loading-spinner/loading-spinner.service';

interface MenuProps {
  label: string;
  icon: string;
  path: string;
  notifications: number;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  headerTitle: string | undefined;
  MAIN_PAGE_WORDS = MAIN_PAGE_WORDS;

  sidebarMenu: MenuProps[] = [
    {
      label: MAIN_PAGE_WORDS.DASHBOARD,
      icon: 'assets/images/DashboardIcon.png',
      path: 'main/dashboard',
      notifications: 0,
    },
    {
      label: MAIN_PAGE_WORDS.PROJECTS,
      icon: 'assets/images/ProjectsIcon.png',
      path: 'main/dashboard/projects',
      notifications: 6,
    },
    {
      label: MAIN_PAGE_WORDS.USERS,
      icon: 'assets/images/UsersIcon.png',
      path: 'main/dashboard/users',
      notifications: 12,
    },
    {
      label: MAIN_PAGE_WORDS.COMPANY_SETTINGS,
      icon: 'assets/images/CompanySettingsIcon.png',
      path: 'main/dashboard/company-settings',
      notifications: 0,
    },
  ];

  items: MenuItem[] = [
    {
      label: 'Home',
    },
    {
      label: 'Subscribers',
    },
    {
      label: 'Company',
    },
    {
      label: 'Contact',
    },
    {
      label: 'Sign out',
      command: () => {
        this.logOut();
      },
    },
  ];
  selectedMenu = this.sidebarMenu.find(
    (menu) => menu.path === this.router.url.substring(1)
  );
  selectedProducts: any;

  dialogVisible: boolean = false;

  sidenavVisible: boolean = false;

  sidenavExpandable: boolean = false;

  isDetailsPage: boolean = false;

  projectDetails: any = {};

  me!: Me | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sidenavService: SidenavService,
    public dialogService: DialogService,
    public projectDetailsService: ProjectDetailsService,
    private loadingService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.projectDetailsService.$details.value) {
      this.projectDetails = this.projectDetailsService.$details.value;
    }

    // this.authService
    //   .getInvitationById(window.localStorage.getItem('invitation') || '')
    //   .subscribe((next) => console.log(next));

    if (this.router.url.includes('details')) {
      this.isDetailsPage = true;
    }

    this.getRoutes();
    this.getMe();
    this.getLastRouteParam();
    this.sidenavExpandable = false;
    this.sidenavVisible = true;
    this.sidenavService.setCollapsed(true);
  }
  getMe() {
    const loadingSpinner = this.loadingService.spinner$.subscribe();
    this.subscriptions.push(
      this.authService.getMe().subscribe((next: Me) => {
        this.me = next;
        loadingSpinner.unsubscribe();
      })
    );
  }
  logOut() {
    this.authService.logOut().subscribe((next) => {});
  }

  setSelectedMenu(item: MenuProps) {
    this.selectedMenu = item;
    this.goToRoute(item.path);
  }

  getRoutes() {
    if (
      this.activatedRoute.snapshot.firstChild?.routeConfig?.path === undefined
    ) {
      this.router.navigate(['main/dashboard']);
    }
    this.router.events.subscribe((_next) => {
      this.headerTitle =
        this.activatedRoute.snapshot.firstChild?.routeConfig?.path?.replace(
          '-',
          ' '
        );
    });
  }

  getLastRouteParam() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url)
      )
      .subscribe((url) => {
        const lastUrlSegment = url.split('?')[0].split('/').pop();
        this.setSidenavOptionsFromUrl(lastUrlSegment);
      });
  }

  setSidenavOptionsFromUrl(url: string | undefined) {
    switch (url) {
      case 'dashboard': {
        this.sidenavExpandable = false;
        this.sidenavVisible = true;
        break;
      }
      case 'projects': {
        this.sidenavExpandable = false;
        this.sidenavVisible = true;
        break;
      }
      case 'users': {
        this.sidenavExpandable = false;
        this.sidenavVisible = true;
        break;
      }
      default: {
        this.sidenavExpandable = true;
        this.sidenavVisible = false;
        this.sidenavService.setCollapsed(false);
      }
    }
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  sidenavShown() {
    this.sidenavVisible = true;
    this.sidenavService.setCollapsed(this.sidenavVisible);
  }

  sidenavHidden() {
    this.sidenavVisible = false;
    this.sidenavService.setCollapsed(this.sidenavVisible);
  }

  newProjectDialog() {
    const dialogRef = this.dialogService.open(NewProjectDialogComponent, {});
  }

}

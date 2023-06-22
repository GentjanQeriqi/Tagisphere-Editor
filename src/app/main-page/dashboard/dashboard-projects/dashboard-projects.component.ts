import { Component, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MAIN_PAGE_WORDS } from 'src/app/app.constants';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { NewProjectDialogComponent } from '../../dialogs/new-project-dialog/new-project-dialog.component';
import { Project } from 'src/app/shared/interfaces/project.interface';
import { ProjectDetailsService } from 'src/app/shared/services/project-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.scss'],
})
export class DashboardProjectsComponent {
  MAIN_PAGE_WORDS = MAIN_PAGE_WORDS;

  paginationRows: number[] = [5, 10, 20, 50, 100];
  selectedPaginationRowNumber: number = this.paginationRows[0];
  selectedProjects: any;
  @Input() projects!: Project[];

  constructor(
    public sidenavService: SidenavService,
    private dialogService: DialogService,
    public projectDetailsService: ProjectDetailsService,
    private router: Router,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.getSidenav$();
    if(!this.projects){
      this.getProjects();
    }
  }

  getSidenav$() {
    this.sidenavService.$collapsed.subscribe((next) => {});
  }

  newProjectDialog() {
    const dialogRef = this.dialogService.open(NewProjectDialogComponent, {});
  }

  goToProjectDetails(project: any, event: MouseEvent, id: number) {
    event.stopPropagation();
    this.projectDetailsService.setDetails(project);
    this.router.navigate([
      `main/details/${this.getProjectType(project.type)}/${id}`,
    ]);
  }

  getProjectType(projectType: string) {
    switch (projectType) {
      case 'CAD':
        return 'cad';
      case 'Map':
        return 'map';
      case 'Survey':
        return 'surveyors';
      default:
        return '';
    }
  }

  getProjectTypeLabel(projectType: string) {
    switch (projectType) {
      case 'CAD':
        return 'CAD';
      case 'Map':
        return 'MAPPER';
      case 'Survey':
        return 'SURVEYORS';
      default:
        return '';
    }
  }

  getTypeColor(projectType: string) {
    switch (projectType) {
      case 'CAD':
        return '#ED3C51';
      case 'Map':
        return '#83DF21';
      case 'Survey':
        return '#FA983E';
      default:
        return '';
    }
  }
  
 getProjects() {
  this.dashboardService.getProjects().subscribe(next => {
    this.projects = next;
  })}
}





import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProjectsComponent } from './dashboard/dashboard-projects/dashboard-projects.component';
import { DashboardUsersComponent } from './dashboard/dashboard-users/dashboard-users.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/projects', component: DashboardProjectsComponent },
      { path: 'dashboard/users', component: DashboardUsersComponent },
      {
        path: 'details',
        loadChildren: () =>
          import('./project-details/project-details.module').then((m) => m.ProjectDetailsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectInputs } from 'src/app/shared/interfaces/createproject.interface';
import { Project } from 'src/app/shared/interfaces/project.interface';
import { ProjectMemberPayload } from 'src/app/shared/interfaces/projectmember.interface';
import { UpdateProjectPayload } from 'src/app/shared/interfaces/projects.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private coreUrl = environment.apiCoreUrl;
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get(`${this.coreUrl}projects/`);
  }

  getProjectMembers(project_pk: number): Observable<any> {
    return this.http.get(`${this.coreUrl}projects/${project_pk}/members`);
  }

  getOrganizations(): Observable<any> {
    return this.http.get(`${this.coreUrl}organization/`);
  }

  getOrgMembers(): Observable<any> {
    return this.http.get(`${this.coreUrl}organization/members/`);
  }

  getProjectRoles(id: number): Observable<any> {
    return this.http.options<Project>(`${this.coreUrl}projects/${id}/members`);
  }


  inviteUser(user: any) {
    return this.http.post(`${this.coreUrl}invitation/`, user);
  }

  getInvitations(): Observable<any> {
    return this.http.get(`${this.coreUrl}invitation/`);
  }


  getOrganizationRoles(): Observable<any> {
    return this.http.options(`${this.coreUrl}invitation/`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.coreUrl}projects/${id}/`);
  }

  addNewProject(payload: CreateProjectInputs): Observable<Project> {
    return this.http.post<Project>(`${this.coreUrl}projects/`, payload);
  }

  addProjectMember(payload: ProjectMemberPayload, project_pk: number): Observable<any> {
    return this.http.post(`${this.coreUrl}projects/${project_pk}/members/`, payload);
  }

  updateProjectInformation(
    id: number,
    payload: Partial<UpdateProjectPayload>
  ): Observable<any> {
    return this.http.patch(`${this.coreUrl}projects/${id}/`, payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { DepartmentDto, RoleDto, TicketCategoryDto, TicketPriorityDto, TicketStatusDto } from './dtos';
import { toApiError } from './api-error';

@Injectable({
  providedIn: 'root'
})
export class MasterApi {
  private readonly baseUrl = `${environment.apiUrl}/api/master`;

  constructor(private readonly http: HttpClient) {}

  getRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(`${this.baseUrl}/roles`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(`${this.baseUrl}/departments`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getTicketStatuses(): Observable<TicketStatusDto[]> {
    return this.http.get<TicketStatusDto[]>(`${this.baseUrl}/ticket-statuses`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getTicketPriorities(): Observable<TicketPriorityDto[]> {
    return this.http.get<TicketPriorityDto[]>(`${this.baseUrl}/ticket-priorities`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getTicketCategories(): Observable<TicketCategoryDto[]> {
    return this.http.get<TicketCategoryDto[]>(`${this.baseUrl}/ticket-categories`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

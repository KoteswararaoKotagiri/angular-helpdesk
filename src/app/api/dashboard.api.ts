import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { toApiError } from './api-error';
import { ActivityResponse, DashboardChartsResponse, DashboardStatsResponse, RecentTicketResponse } from './dtos';

@Injectable({ providedIn: 'root' })
export class DashboardApi {
  private readonly baseUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(private readonly http: HttpClient) {}

  getStats(): Observable<DashboardStatsResponse> {
    return this.http.get<DashboardStatsResponse>(`${this.baseUrl}/stats`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getCharts(): Observable<DashboardChartsResponse> {
    return this.http.get<DashboardChartsResponse>(`${this.baseUrl}/charts`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getActivity(): Observable<ActivityResponse[]> {
    return this.http.get<ActivityResponse[]>(`${this.baseUrl}/activity`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getRecentTickets(): Observable<RecentTicketResponse[]> {
    return this.http.get<RecentTicketResponse[]>(`${this.baseUrl}/recent-tickets`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

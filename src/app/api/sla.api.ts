import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { toApiError } from './api-error';
import { SlaPerformanceResponse, SlaTicketResponse } from './dtos';

@Injectable({ providedIn: 'root' })
export class SlaApi {
  private readonly baseUrl = `${environment.apiUrl}/api/sla`;

  constructor(private readonly http: HttpClient) {}

  getPerformance(): Observable<SlaPerformanceResponse> {
    return this.http.get<SlaPerformanceResponse>(`${this.baseUrl}/performance`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getOverdue(): Observable<SlaTicketResponse[]> {
    return this.http.get<SlaTicketResponse[]>(`${this.baseUrl}/overdue`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getNearBreach(): Observable<SlaTicketResponse[]> {
    return this.http.get<SlaTicketResponse[]>(`${this.baseUrl}/near`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getBreaches(): Observable<SlaTicketResponse[]> {
    return this.http.get<SlaTicketResponse[]>(`${this.baseUrl}/breaches`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getCountdown(): Observable<SlaTicketResponse[]> {
    return this.http.get<SlaTicketResponse[]>(`${this.baseUrl}/countdown`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AssignTicketRequestDto, CreateTicketRequestDto, PagedTicketResponseDto, TicketDto, UpdateTicketStatusRequestDto } from './dtos';
import { toApiError } from './api-error';

@Injectable({
  providedIn: 'root'
})
export class TicketApi {
  private readonly baseUrl = `${environment.apiUrl}/api/ticket`;

  constructor(private readonly http: HttpClient) {}

  create(request: CreateTicketRequestDto): Observable<TicketDto> {
    return this.http.post<TicketDto>(this.baseUrl, request).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  getTickets(query: TicketQuery = {}): Observable<PagedTicketResponseDto> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<PagedTicketResponseDto>(this.baseUrl, { params }).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  assign(ticketId: number | string, request: AssignTicketRequestDto): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.baseUrl}/${ticketId}/assign`, request).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  updateStatus(ticketId: number | string, request: UpdateTicketStatusRequestDto): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.baseUrl}/${ticketId}/status`, request).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

export interface TicketQuery {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  statusId?: number | string;
  priorityId?: number | string;
  departmentId?: number | string;
  assigneeId?: number | string;
}

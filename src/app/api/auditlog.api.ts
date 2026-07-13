import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { toApiError } from './api-error';
import { AuditLogItem, AuditLogQuery, PagedResult } from './dtos';

@Injectable({ providedIn: 'root' })
export class AuditLogApi {
  private readonly baseUrl = `${environment.apiUrl}/api/auditlogs`;

  constructor(private readonly http: HttpClient) {}

  getAuditLogs(query: AuditLogQuery = {}): Observable<PagedResult<AuditLogItem>> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http
      .get<PagedResult<AuditLogItem>>(this.baseUrl, { params })
      .pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

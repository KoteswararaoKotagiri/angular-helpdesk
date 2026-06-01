import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { toApiError } from './api-error';
import { AttachmentDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class AttachmentApi {
  private readonly baseUrl = `${environment.apiUrl}/api/ticket`;

  constructor(private readonly http: HttpClient) {}

  getAttachments(ticketId: number | string): Observable<AttachmentDto[]> {
    return this.http.get<AttachmentDto[]>(`${this.baseUrl}/${ticketId}/attachments`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  uploadAttachment(ticketId: number | string, file: File): Observable<AttachmentDto> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<AttachmentDto>(`${this.baseUrl}/${ticketId}/attachments`, formData).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  downloadAttachment(ticketId: number | string, attachmentId: number | string): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl}/${ticketId}/attachments/${attachmentId}/download`, { responseType: 'blob' })
      .pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { toApiError } from './api-error';
import { CommentDto, CreateCommentRequestDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class CommentApi {
  private readonly baseUrl = `${environment.apiUrl}/api/ticket`;

  constructor(private readonly http: HttpClient) {}

  getComments(ticketId: number | string): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${this.baseUrl}/${ticketId}/comments`).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }

  addComment(ticketId: number | string, request: CreateCommentRequestDto): Observable<CommentDto> {
    return this.http.post<CommentDto>(`${this.baseUrl}/${ticketId}/comments`, request).pipe(catchError((error: unknown) => throwError(() => toApiError(error))));
  }
}

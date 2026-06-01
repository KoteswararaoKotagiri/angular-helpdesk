import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequestDto, LoginResponseDto } from './dtos';
import { toApiError } from './api-error';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  private readonly baseUrl = `${environment.apiUrl}/api/auth`;

  constructor(private readonly http: HttpClient) {}

  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, request).pipe(
      catchError((error: unknown) => throwError(() => toApiError(error)))
    );
  }

  register<TRequest extends object>(request: TRequest): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/register`, request).pipe(
      catchError((error: unknown) => throwError(() => toApiError(error)))
    );
  }
}

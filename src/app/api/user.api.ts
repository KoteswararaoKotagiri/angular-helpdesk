import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { toApiError } from './api-error';
import {
  ChangePasswordRequest,
  PagedResult,
  UpdateProfileRequest,
  UpdateUserRequest,
  UserDetail,
  UserListItem,
  UserListQuery
} from './dtos';

@Injectable({ providedIn: 'root' })
export class UserApi {
  private readonly baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private readonly http: HttpClient) {}

  getUsers(query: UserListQuery = {}): Observable<PagedResult<UserListItem>> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http.get<PagedResult<UserListItem>>(this.baseUrl, { params }).pipe(this.handle());
  }

  getUser(id: string): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.baseUrl}/${id}`).pipe(this.handle());
  }

  updateUser(id: string, request: UpdateUserRequest): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.baseUrl}/${id}`, request).pipe(this.handle());
  }

  deactivateUser(id: string): Observable<UserDetail> {
    return this.http.delete<UserDetail>(`${this.baseUrl}/${id}`).pipe(this.handle());
  }

  changeRole(id: string, roleId: string): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.baseUrl}/${id}/role`, { roleId }).pipe(this.handle());
  }

  changeDepartment(id: string, departmentId: string): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.baseUrl}/${id}/department`, { departmentId }).pipe(this.handle());
  }

  getProfile(): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.baseUrl}/profile`).pipe(this.handle());
  }

  updateProfile(request: UpdateProfileRequest): Observable<UserDetail> {
    return this.http.put<UserDetail>(`${this.baseUrl}/profile`, request).pipe(this.handle());
  }

  changePassword(request: ChangePasswordRequest): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseUrl}/change-password`, request).pipe(this.handle());
  }

  private handle<T>() {
    return catchError<T, Observable<never>>((error: unknown) => throwError(() => toApiError(error)));
  }
}

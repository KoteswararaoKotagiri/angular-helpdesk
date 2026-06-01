import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AuthApi } from '../../api/auth.api';
import { LoginRequestDto, LoginResponseDto } from '../../api/dtos';
import { StorageService } from '../services/storage.service';
import { CurrentUser, CurrentUserService } from './current-user.service';

interface JwtPayload {
  exp?: number;
  sub?: string;
  email?: string;
  unique_name?: string;
  name?: string;
  role?: string | string[];
  roles?: string | string[];
  [claim: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'helpdesk.auth.token';
  private readonly authStateSubject = new BehaviorSubject<boolean>(this.hasValidToken());

  readonly isAuthenticated$ = this.authStateSubject.asObservable();

  constructor(
    private readonly authApi: AuthApi,
    private readonly storage: StorageService,
    private readonly currentUserService: CurrentUserService,
    private readonly router: Router
  ) {
    this.restoreSession();
  }

  login(request: LoginRequestDto): Observable<CurrentUser> {
    return this.authApi.login(request).pipe(
      tap((response) => this.persistLogin(response)),
      map(() => this.currentUserService.snapshot as CurrentUser)
    );
  }

  logout(redirect = true): void {
    this.storage.remove(this.tokenKey);
    this.currentUserService.setUser(null);
    this.authStateSubject.next(false);
    if (redirect) {
      void this.router.navigateByUrl('/auth/login');
    }
  }

  restoreSession(): void {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.logout(false);
      return;
    }

    this.currentUserService.setUser(this.buildUserFromToken(token));
    this.authStateSubject.next(true);
  }

  getToken(): string | null {
    return this.storage.get<string>(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  hasRole(allowedRoles: string[]): boolean {
    const roles = this.currentUserService.snapshot?.roles ?? this.buildUserFromToken(this.getToken() ?? '')?.roles ?? [];
    return allowedRoles.length === 0 || roles.some((role) => allowedRoles.includes(role));
  }

  isTokenExpired(token = this.getToken() ?? ''): boolean {
    if (!token) {
      return true;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp ? decoded.exp * 1000 <= Date.now() : false;
    } catch {
      return true;
    }
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private persistLogin(response: LoginResponseDto): void {
    this.storage.set(this.tokenKey, response.token);
    const roles = response.roles ?? (response.role ? [response.role] : undefined);
    this.currentUserService.setUser({
      id: response.userId,
      email: response.email,
      fullName: response.fullName,
      roles: roles ?? this.buildUserFromToken(response.token).roles
    });
    this.authStateSubject.next(true);
  }

  private buildUserFromToken(token: string): CurrentUser {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const roleClaim = decoded.roles ?? decoded.role ?? decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return {
        id: decoded.sub,
        email: decoded.email,
        fullName: decoded.name ?? decoded.unique_name,
        roles: Array.isArray(roleClaim) ? roleClaim.map(String) : roleClaim ? [String(roleClaim)] : []
      };
    } catch {
      return { roles: [] };
    }
  }
}

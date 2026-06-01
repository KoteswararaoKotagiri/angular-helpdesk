import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentUser {
  id?: string;
  email?: string;
  fullName?: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);

  readonly currentUser$: Observable<CurrentUser | null> = this.currentUserSubject.asObservable();

  get snapshot(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  setUser(user: CurrentUser | null): void {
    this.currentUserSubject.next(user);
  }
}

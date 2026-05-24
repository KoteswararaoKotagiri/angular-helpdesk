import { EnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { jwtInterceptor } from './auth/jwt.interceptor';
import { appReducers } from '../store/app.state';

export const coreProviders: EnvironmentProviders[] = [
  provideHttpClient(withInterceptors([jwtInterceptor])),
  provideStore(appReducers)
];

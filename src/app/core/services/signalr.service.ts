import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationApi, RealtimeNotification } from '../../api/notification.api';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  constructor(private readonly notificationApi: NotificationApi) {}

  get notifications$(): Observable<RealtimeNotification> {
    return this.notificationApi.notifications$;
  }

  start(): Promise<void> {
    return this.notificationApi.start();
  }

  stop(): Promise<void> {
    return this.notificationApi.stop();
  }
}

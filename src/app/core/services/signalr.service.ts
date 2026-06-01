import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationApi, RealtimeNotification } from '../../api/notification.api';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  readonly notifications$: Observable<RealtimeNotification> = this.notificationApi.notifications$;

  constructor(private readonly notificationApi: NotificationApi) {}

  start(): Promise<void> {
    return this.notificationApi.start();
  }

  stop(): Promise<void> {
    return this.notificationApi.stop();
  }
}

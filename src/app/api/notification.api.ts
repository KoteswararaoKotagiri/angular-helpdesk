import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth/auth.service';

export type NotificationEventName = 'Connected' | 'TicketAssigned' | 'TicketUpdated' | 'CommentAdded';

export interface RealtimeNotification {
  event: NotificationEventName;
  payload: unknown;
  receivedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class NotificationApi {
  private connection?: signalR.HubConnection;
  private readonly notificationsSubject = new Subject<RealtimeNotification>();

  readonly notifications$: Observable<RealtimeNotification> = this.notificationsSubject.asObservable();

  constructor(private readonly authService: AuthService) {}

  start(): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return Promise.resolve();
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalrHubUrl, {
        accessTokenFactory: () => this.authService.getToken() ?? ''
      })
      .withAutomaticReconnect()
      .build();

    this.registerHandlers(this.connection);
    return this.connection.start();
  }

  stop(): Promise<void> {
    return this.connection?.stop() ?? Promise.resolve();
  }

  private registerHandlers(connection: signalR.HubConnection): void {
    (['Connected', 'TicketAssigned', 'TicketUpdated', 'CommentAdded'] as const).forEach((event) => {
      connection.on(event, (payload: unknown) => {
        this.notificationsSubject.next({ event, payload, receivedAt: new Date() });
      });
    });
  }
}

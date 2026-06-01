import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RealtimeNotification } from '../../api/notification.api';
import { SignalrService } from './signalr.service';

export interface HelpdeskNotification {
  icon: string;
  tone: 'red' | 'blue' | 'amber' | 'green';
  text: string;
  time: string;
  unread: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationsSubject = new BehaviorSubject<HelpdeskNotification[]>([]);

  readonly notifications$ = this.notificationsSubject.asObservable();

  constructor(private readonly signalrService: SignalrService) {
    this.signalrService.notifications$.subscribe((notification) => this.addRealtimeNotification(notification));
  }

  startRealtime(): void {
    void this.signalrService.start();
  }

  markAllRead(): void {
    this.notificationsSubject.next(this.notificationsSubject.value.map((notification) => ({ ...notification, unread: false })));
  }

  private addRealtimeNotification(notification: RealtimeNotification): void {
    this.notificationsSubject.next([
      this.mapRealtimeNotification(notification),
      ...this.notificationsSubject.value
    ]);
  }

  private mapRealtimeNotification(notification: RealtimeNotification): HelpdeskNotification {
    const text = this.extractText(notification);
    switch (notification.event) {
      case 'TicketAssigned':
        return { icon: 'person_add', tone: 'blue', text, time: 'just now', unread: true };
      case 'TicketUpdated':
        return { icon: 'confirmation_number', tone: 'green', text, time: 'just now', unread: true };
      case 'CommentAdded':
        return { icon: 'chat_bubble', tone: 'amber', text, time: 'just now', unread: true };
      default:
        return { icon: 'notifications', tone: 'blue', text, time: 'just now', unread: true };
    }
  }

  private extractText(notification: RealtimeNotification): string {
    const payload = notification.payload as { message?: string; ticketNumber?: string; title?: string } | null;
    return payload?.message ?? `${notification.event}${payload?.ticketNumber ? ` - ${payload.ticketNumber}` : ''}${payload?.title ? `: ${payload.title}` : ''}`;
  }
}

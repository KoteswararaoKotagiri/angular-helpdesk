import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatIconModule],
  templateUrl: './notification-panel.component.html',
  styleUrl: './notification-panel.component.scss'
})
export class NotificationPanelComponent {
  private readonly notificationService = inject(NotificationService);

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  readonly notifications$ = this.notificationService.notifications$;

  markAllRead(): void {
    this.notificationService.markAllRead();
  }
}

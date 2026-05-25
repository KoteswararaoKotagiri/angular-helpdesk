import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface HelpdeskNotification {
  icon: string;
  tone: 'red' | 'blue' | 'amber' | 'green';
  text: string;
  time: string;
  unread: boolean;
}

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './notification-panel.component.html',
  styleUrl: './notification-panel.component.scss'
})
export class NotificationPanelComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  readonly notifications: HelpdeskNotification[] = [
    {
      icon: 'warning',
      tone: 'red',
      text: 'SLA breach risk - #HD-1042 needs attention in 1h',
      time: 'just now',
      unread: true
    },
    {
      icon: 'person_add',
      tone: 'blue',
      text: '#HD-1041 has been assigned to you by Priya S.',
      time: '3 min ago',
      unread: true
    },
    {
      icon: 'chat_bubble',
      tone: 'amber',
      text: 'Anita M. commented on #HD-1040',
      time: '7 min ago',
      unread: true
    },
    {
      icon: 'check',
      tone: 'green',
      text: '#HD-1038 has been resolved by Rahul K.',
      time: '15 min ago',
      unread: false
    },
    {
      icon: 'confirmation_number',
      tone: 'blue',
      text: 'New ticket #HD-1043 created in IT Department',
      time: '22 min ago',
      unread: false
    }
  ];

  markAllRead(): void {
    this.notifications.forEach((notification) => {
      notification.unread = false;
    });
  }
}

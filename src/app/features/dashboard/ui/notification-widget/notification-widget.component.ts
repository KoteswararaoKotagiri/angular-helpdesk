import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationItem } from '../../models/dashboard.models';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-notification-widget',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, DashboardCardComponent],
  templateUrl: './notification-widget.component.html',
  styleUrl: './notification-widget.component.scss'
})
export class NotificationWidgetComponent {
  @Input({ required: true }) notifications: NotificationItem[] = [];
}

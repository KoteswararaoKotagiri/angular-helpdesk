import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivityItem } from '../../models/dashboard.models';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule, MatIconModule, DashboardCardComponent],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss'
})
export class ActivityFeedComponent {
  @Input({ required: true }) activities: ActivityItem[] = [];
}

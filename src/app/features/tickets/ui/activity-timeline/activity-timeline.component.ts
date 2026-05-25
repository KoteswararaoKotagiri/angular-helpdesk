import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimelineItem } from '../../models/ticket-details.models';

@Component({
  selector: 'app-activity-timeline',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './activity-timeline.component.html',
  styleUrl: './activity-timeline.component.scss'
})
export class ActivityTimelineComponent {
  @Input({ required: true }) items: TimelineItem[] = [];
}

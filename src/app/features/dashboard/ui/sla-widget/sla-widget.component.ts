import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SlaItem } from '../../models/dashboard.models';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-sla-widget',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, DashboardCardComponent],
  templateUrl: './sla-widget.component.html',
  styleUrl: './sla-widget.component.scss'
})
export class SlaWidgetComponent {
  @Input({ required: true }) items: SlaItem[] = [];
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChartWidgetModel, DashboardTone } from '../../models/dashboard.models';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule, DashboardCardComponent],
  templateUrl: './chart-widget.component.html',
  styleUrl: './chart-widget.component.scss'
})
export class ChartWidgetComponent {
  @Input({ required: true }) widget!: ChartWidgetModel;

  maxValue(): number {
    return Math.max(...this.widget.series.map((item) => item.value), 1);
  }

  barHeight(value: number): number {
    return Math.max(16, Math.round((value / this.maxValue()) * 104));
  }

  total(): number {
    return this.widget.series.reduce((sum, item) => sum + item.value, 0);
  }

  percent(value: number): number {
    return Math.round((value / Math.max(this.total(), 1)) * 100);
  }

  lineHeight(value: number): number {
    return Math.max(18, this.percent(value));
  }

  toneClass(tone: DashboardTone): string {
    return `tone-${tone}`;
  }
}

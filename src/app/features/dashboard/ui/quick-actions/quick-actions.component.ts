import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAction } from '../../models/dashboard.models';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, DashboardCardComponent],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss'
})
export class QuickActionsComponent {
  @Input({ required: true }) actions: DashboardAction[] = [];
}

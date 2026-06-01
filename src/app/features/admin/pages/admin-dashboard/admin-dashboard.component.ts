import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminMetric, ConfigurationItem } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { ConfigurationCardComponent } from '../../ui/configuration-card/configuration-card.component';
import { EmptyStateComponent } from '../../ui/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../ui/loading-state/loading-state.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, AdminHeaderComponent, ConfigurationCardComponent, EmptyStateComponent, LoadingStateComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  readonly metrics: AdminMetric[] = [
    { label: 'Total users', value: '248', icon: 'group', tone: 'blue', meta: '21 invited this month' },
    { label: 'Active users', value: '221', icon: 'verified_user', tone: 'green', meta: '89% enabled' },
    { label: 'Engineers', value: '36', icon: 'engineering', tone: 'purple', meta: '8 queues covered' },
    { label: 'Departments', value: '12', icon: 'business', tone: 'neutral', meta: '10 active' },
    { label: 'Categories', value: '42', icon: 'category', tone: 'amber', meta: '6 workflow groups' },
    { label: 'Open tickets', value: '47', icon: 'confirmation_number', tone: 'blue', meta: '9 unassigned' },
    { label: 'SLA compliance', value: '94%', icon: 'schedule', tone: 'green', meta: '3 at risk' },
    { label: 'System health', value: '99.9%', icon: 'monitor_heart', tone: 'green', meta: 'All services online' }
  ];

  readonly cards: ConfigurationItem[] = [
    { title: 'Identity readiness', description: 'Role coverage, inactive accounts, pending invitations, and secure access hygiene.', icon: 'shield', tone: 'green', meta: 'No critical gaps', progress: 92 },
    { title: 'Ticket operations', description: 'Statuses, priority definitions, category ownership, and workflow routing health.', icon: 'account_tree', tone: 'blue', meta: '4 workflows configured', progress: 78 },
    { title: 'SLA posture', description: 'Response targets, escalation paths, calendar coverage, and breach risk concentration.', icon: 'timer', tone: 'amber', meta: '3 policies need review', progress: 84 },
    { title: 'Audit coverage', description: 'Administrative changes, sign-ins, access updates, and compliance evidence.', icon: 'fact_check', tone: 'purple', meta: '1,284 events retained', progress: 96 }
  ];
}

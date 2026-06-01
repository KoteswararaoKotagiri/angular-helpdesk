import { Component } from '@angular/core';
import { AdminMetric, AuditLogRow, FilterOption } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { AuditLogTableComponent } from '../../ui/audit-log-table/audit-log-table.component';
import { FilterToolbarComponent } from '../../ui/filter-toolbar/filter-toolbar.component';

@Component({
  selector: 'app-audit-logs-page',
  standalone: true,
  imports: [AdminHeaderComponent, AuditLogTableComponent, FilterToolbarComponent],
  templateUrl: './audit-logs-page.component.html',
  styleUrl: './audit-logs-page.component.scss'
})
export class AuditLogsPageComponent {
  readonly metrics: AdminMetric[] = [
    { label: 'Events today', value: '184', icon: 'history', tone: 'blue', meta: '12 admin changes' },
    { label: 'Config changes', value: '27', icon: 'settings', tone: 'purple', meta: 'Last 7 days' },
    { label: 'Login events', value: '912', icon: 'login', tone: 'green', meta: '99.2% successful' },
    { label: 'Risk events', value: '3', icon: 'warning', tone: 'amber', meta: 'Need review' }
  ];

  readonly filters: FilterOption[] = [
    { label: 'All events', count: 1284, active: true },
    { label: 'User actions', count: 524 },
    { label: 'Configuration', count: 81, tone: 'purple' },
    { label: 'Login history', count: 618, tone: 'green' },
    { label: 'Ticket activity', count: 61, tone: 'blue' }
  ];

  readonly logs: AuditLogRow[] = [
    { actor: 'Koteswar Rao', action: 'Changed permission matrix', target: 'Engineer role gained internal note visibility', category: 'Security', time: '2 min ago', ip: '10.14.2.18', tone: 'purple' },
    { actor: 'Priya Sharma', action: 'Created SLA rule', target: 'Critical infrastructure response policy', category: 'SLA', time: '18 min ago', ip: '10.14.2.44', tone: 'amber' },
    { actor: 'Rahul Kumar', action: 'Updated category owner', target: 'VPN access moved to IT Operations', category: 'Configuration', time: '41 min ago', ip: '10.14.4.21', tone: 'blue' },
    { actor: 'Anita Mehta', action: 'Bulk assigned users', target: 'Finance analysts assigned Requester role', category: 'Identity', time: '1h ago', ip: '10.14.5.12', tone: 'green' },
    { actor: 'System', action: 'Login risk detected', target: 'Impossible travel warning for inactive user', category: 'Login', time: '2h ago', ip: '172.16.8.9', tone: 'red' }
  ];
}

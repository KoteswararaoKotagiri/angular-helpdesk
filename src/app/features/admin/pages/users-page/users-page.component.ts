import { Component } from '@angular/core';
import { AdminMetric, FilterOption, UserRow } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { BulkActionsBarComponent } from '../../ui/bulk-actions-bar/bulk-actions-bar.component';
import { FilterToolbarComponent } from '../../ui/filter-toolbar/filter-toolbar.component';
import { UserTableComponent } from '../../ui/user-table/user-table.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [AdminHeaderComponent, BulkActionsBarComponent, FilterToolbarComponent, UserTableComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  readonly metrics: AdminMetric[] = [
    { label: 'Total users', value: '248', icon: 'group', tone: 'blue', meta: 'Across 12 departments' },
    { label: 'Active', value: '221', icon: 'check_circle', tone: 'green', meta: '89% active rate' },
    { label: 'Engineers', value: '36', icon: 'engineering', tone: 'purple', meta: '8 assignment groups' },
    { label: 'Pending invites', value: '11', icon: 'mail', tone: 'amber', meta: '6 expiring soon' }
  ];

  readonly filters: FilterOption[] = [
    { label: 'All', count: 248, active: true },
    { label: 'Active', count: 221, tone: 'green' },
    { label: 'Invited', count: 11, tone: 'amber' },
    { label: 'Inactive', count: 16, tone: 'neutral' },
    { label: 'Privileged', count: 18, tone: 'purple' }
  ];

  readonly users: UserRow[] = [
    { name: 'Koteswar Rao', email: 'koteswar@acme.com', initials: 'KR', role: 'System Admin', department: 'IT', status: 'Active', statusTone: 'green', lastSeen: 'Now', tickets: 12, selected: true },
    { name: 'Priya Sharma', email: 'priya@acme.com', initials: 'PS', role: 'Helpdesk Manager', department: 'Operations', status: 'Active', statusTone: 'green', lastSeen: '8 min ago', tickets: 24, selected: true },
    { name: 'Rahul Kumar', email: 'rahul@acme.com', initials: 'RK', role: 'Engineer', department: 'IT', status: 'Active', statusTone: 'green', lastSeen: '21 min ago', tickets: 31 },
    { name: 'Anita Mehta', email: 'anita@acme.com', initials: 'AM', role: 'Engineer', department: 'Finance', status: 'Active', statusTone: 'green', lastSeen: '1h ago', tickets: 18 },
    { name: 'Vijay Kumar', email: 'vijay@acme.com', initials: 'VK', role: 'Requester', department: 'Sales', status: 'Invited', statusTone: 'amber', lastSeen: 'Never', tickets: 2 },
    { name: 'Meera Nair', email: 'meera@acme.com', initials: 'MN', role: 'Department Owner', department: 'HR', status: 'Inactive', statusTone: 'neutral', lastSeen: '32d ago', tickets: 0 }
  ];

  get selectedCount(): number {
    return this.users.filter((user) => user.selected).length;
  }
}

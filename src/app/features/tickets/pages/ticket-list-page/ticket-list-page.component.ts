import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkActionsComponent } from '../../ui/bulk-actions/bulk-actions.component';
import { EmptyStateComponent } from '../../ui/empty-state/empty-state.component';
import { FilterBarComponent } from '../../ui/filter-bar/filter-bar.component';
import { LoadingStateComponent } from '../../ui/loading-state/loading-state.component';
import { PaginationBarComponent } from '../../ui/pagination-bar/pagination-bar.component';
import { TicketTableComponent } from '../../ui/ticket-table/ticket-table.component';
import { TicketToolbarComponent } from '../../ui/ticket-toolbar/ticket-toolbar.component';
import { TicketFilter, TicketMetric, TicketRowModel } from '../../models/ticket-list.models';

@Component({
  selector: 'app-ticket-list-page',
  standalone: true,
  imports: [CommonModule, BulkActionsComponent, EmptyStateComponent, FilterBarComponent, LoadingStateComponent, PaginationBarComponent, TicketTableComponent, TicketToolbarComponent],
  templateUrl: './ticket-list-page.component.html',
  styleUrl: './ticket-list-page.component.scss'
})
export class TicketListPageComponent {
  readonly isLoading = false;
  readonly showEmptyState = false;

  readonly metrics: TicketMetric[] = [
    { label: 'Open', value: '47', tone: 'blue' },
    { label: 'SLA risk', value: '3', tone: 'red' },
    { label: 'Unassigned', value: '9', tone: 'amber' },
    { label: 'Resolved today', value: '18', tone: 'green' }
  ];

  readonly filters: TicketFilter[] = [
    { label: 'All', value: 'all', count: 180, active: true },
    { label: 'Open', value: 'open', count: 47, tone: 'blue' },
    { label: 'In progress', value: 'progress', count: 31, tone: 'amber' },
    { label: 'SLA risk', value: 'sla', count: 3, icon: 'warning', tone: 'red' },
    { label: 'Unread', value: 'unread', count: 12, icon: 'mark_email_unread', tone: 'purple' },
    { label: 'Unassigned', value: 'unassigned', count: 9, icon: 'person_off' }
  ];

  readonly tickets: TicketRowModel[] = [
    { id: '#HD-1042', title: 'Production server down', summary: 'Auth service returning 503 errors across production.', requester: 'Koteswar Rao', assignee: 'Rahul K.', assigneeInitials: 'RK', department: 'IT', status: 'In progress', statusTone: 'amber', priority: 'Critical', priorityTone: 'red', slaLabel: '1h 12m', slaPercent: 86, slaTone: 'red', created: '2h ago', updated: 'updated now', comments: 12, attachments: 3, activity: 'hot', unread: true, selected: true },
    { id: '#HD-1041', title: 'VPN disconnects after Windows update', summary: 'Multiple users affected on floor 2 after patch rollout.', requester: 'Anita Mehta', assignee: 'Anita M.', assigneeInitials: 'AM', department: 'IT', status: 'Open', statusTone: 'blue', priority: 'High', priorityTone: 'amber', slaLabel: '4h left', slaPercent: 52, slaTone: 'amber', created: '4h ago', updated: '3 min ago', comments: 8, attachments: 1, activity: 'active', unread: true, selected: true },
    { id: '#HD-1040', title: 'Email not syncing on Outlook mobile', summary: 'HR department reports intermittent sync failures.', requester: 'Priya Sharma', assignee: 'Unassigned', assigneeInitials: 'UA', department: 'HR', status: 'Open', statusTone: 'blue', priority: 'Medium', priorityTone: 'blue', slaLabel: '8h left', slaPercent: 25, slaTone: 'green', created: '6h ago', updated: '7 min ago', comments: 5, attachments: 0, activity: 'active' },
    { id: '#HD-1039', title: 'CRM access request for sales team', summary: 'Access approved by finance manager, provisioning pending.', requester: 'Vijay Kumar', assignee: 'Priya S.', assigneeInitials: 'PS', department: 'Finance', status: 'Resolved', statusTone: 'green', priority: 'Low', priorityTone: 'green', slaLabel: 'Met SLA', slaPercent: 100, slaTone: 'green', created: '1d ago', updated: '22 min ago', comments: 3, attachments: 2, activity: 'quiet' },
    { id: '#HD-1038', title: 'Printer offline on Floor 3', summary: 'Canon MF445dw is unreachable from facilities VLAN.', requester: 'Meera N.', assignee: 'Rahul K.', assigneeInitials: 'RK', department: 'Facilities', status: 'In progress', statusTone: 'amber', priority: 'Medium', priorityTone: 'blue', slaLabel: '2h left', slaPercent: 72, slaTone: 'amber', created: '2d ago', updated: '31 min ago', comments: 6, attachments: 1, activity: 'quiet' },
    { id: '#HD-1037', title: 'Payroll export permission issue', summary: 'Finance analysts cannot export monthly payroll files.', requester: 'Arjun P.', assignee: 'Anita M.', assigneeInitials: 'AM', department: 'Finance', status: 'On hold', statusTone: 'purple', priority: 'High', priorityTone: 'amber', slaLabel: '6h left', slaPercent: 44, slaTone: 'green', created: '2d ago', updated: '1h ago', comments: 9, attachments: 4, activity: 'active', unread: true },
    { id: '#HD-1036', title: 'New laptop setup for onboarding', summary: 'Pre-stage device, VPN, email, and endpoint protection.', requester: 'HR Ops', assignee: 'Rahul K.', assigneeInitials: 'RK', department: 'IT', status: 'Open', statusTone: 'blue', priority: 'Low', priorityTone: 'green', slaLabel: '2d left', slaPercent: 18, slaTone: 'green', created: '3d ago', updated: '2h ago', comments: 2, attachments: 0, activity: 'quiet' },
    { id: '#HD-1035', title: 'Database backup warning', summary: 'Nightly backup missed retention window twice this week.', requester: 'Infra Monitor', assignee: 'Unassigned', assigneeInitials: 'UA', department: 'IT', status: 'Open', statusTone: 'blue', priority: 'Critical', priorityTone: 'red', slaLabel: 'Overdue', slaPercent: 100, slaTone: 'red', created: '3d ago', updated: '12 min ago', comments: 14, attachments: 2, activity: 'hot', unread: true }
  ];

  get selectedCount(): number {
    return this.tickets.filter((ticket) => ticket.selected).length;
  }
}

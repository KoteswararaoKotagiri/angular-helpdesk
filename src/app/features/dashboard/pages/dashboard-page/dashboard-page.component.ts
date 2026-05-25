import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivityItem,
  ChartWidgetModel,
  DashboardAction,
  DashboardFilter,
  NotificationItem,
  SlaItem,
  StatCardModel,
  TicketSummaryItem
} from '../../models/dashboard.models';
import { ActivityFeedComponent } from '../../ui/activity-feed/activity-feed.component';
import { ChartWidgetComponent } from '../../ui/chart-widget/chart-widget.component';
import { DashboardCardComponent } from '../../ui/dashboard-card/dashboard-card.component';
import { DashboardHeaderComponent } from '../../ui/dashboard-header/dashboard-header.component';
import { EmptyStateComponent } from '../../ui/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../ui/loading-state/loading-state.component';
import { NotificationWidgetComponent } from '../../ui/notification-widget/notification-widget.component';
import { QuickActionsComponent } from '../../ui/quick-actions/quick-actions.component';
import { SlaWidgetComponent } from '../../ui/sla-widget/sla-widget.component';
import { StatCardComponent } from '../../ui/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ActivityFeedComponent,
    ChartWidgetComponent,
    DashboardCardComponent,
    DashboardHeaderComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    NotificationWidgetComponent,
    QuickActionsComponent,
    SlaWidgetComponent,
    StatCardComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  readonly todayLabel = 'Monday, 25 May 2026';

  readonly filters: DashboardFilter[] = [
    { label: 'All work', count: 180, active: true },
    { label: 'My queue', count: 24, icon: 'person' },
    { label: 'SLA risk', count: 3, icon: 'warning' },
    { label: 'Unassigned', count: 9, icon: 'person_off' },
    { label: 'Resolved today', count: 18, icon: 'task_alt' }
  ];

  readonly stats: StatCardModel[] = [
    { label: 'Open tickets', value: '47', icon: 'confirmation_number', tone: 'blue', change: '4 more than yesterday', changeDirection: 'down', meta: 'live' },
    { label: 'In progress', value: '31', icon: 'sync', tone: 'amber', change: '8 owned by your team', changeDirection: 'neutral', meta: 'active' },
    { label: 'Resolved today', value: '18', icon: 'check_circle', tone: 'green', change: '3 above daily average', changeDirection: 'up', meta: 'today' },
    { label: 'Critical tickets', value: '8', icon: 'local_fire_department', tone: 'red', change: '2 require escalation', changeDirection: 'down', meta: 'p1' },
    { label: 'SLA breaches', value: '3', icon: 'gpp_maybe', tone: 'red', change: 'Needs immediate attention', changeDirection: 'down', meta: 'risk' }
  ];

  readonly charts: ChartWidgetModel[] = [
    {
      title: 'Tickets by status',
      subtitle: 'This week',
      actionLabel: 'Full report',
      type: 'bar',
      insight: 'Open volume is up in IT, but same-day resolution is trending ahead of target.',
      series: [
        { label: 'Open', value: 47, tone: 'blue' },
        { label: 'In prog', value: 31, tone: 'amber' },
        { label: 'On hold', value: 14, tone: 'purple' },
        { label: 'Resolved', value: 68, tone: 'green' },
        { label: 'Closed', value: 20, tone: 'neutral' }
      ]
    },
    {
      title: 'Priority distribution',
      subtitle: 'Current queue',
      actionLabel: 'Drill in',
      type: 'donut',
      insight: 'Critical work is concentrated in infrastructure and access management.',
      series: [
        { label: 'Critical', value: 8, tone: 'red' },
        { label: 'High', value: 14, tone: 'amber' },
        { label: 'Medium', value: 19, tone: 'blue' },
        { label: 'Low', value: 6, tone: 'green' }
      ]
    },
    {
      title: 'Department analytics',
      subtitle: '7-day volume',
      type: 'line',
      insight: 'IT and HR queues show the strongest correlation with policy rollouts this week.',
      series: [
        { label: 'Mon', value: 8, tone: 'accent' },
        { label: 'Tue', value: 12, tone: 'accent' },
        { label: 'Wed', value: 16, tone: 'accent' },
        { label: 'Thu', value: 10, tone: 'accent' },
        { label: 'Fri', value: 13, tone: 'accent' },
        { label: 'Sat', value: 3, tone: 'neutral' },
        { label: 'Sun', value: 1, tone: 'neutral' }
      ]
    }
  ];

  readonly slaItems: SlaItem[] = [
    { label: 'Critical', percent: 88, tone: 'amber', meta: '4h response' },
    { label: 'High', percent: 94, tone: 'green', meta: '8h response' },
    { label: 'Medium', percent: 98, tone: 'green', meta: '24h response' },
    { label: 'Low', percent: 100, tone: 'green', meta: '72h response' }
  ];

  readonly activities: ActivityItem[] = [
    { actor: 'Priya S.', text: 'assigned to Rahul', ticket: '#HD-1042', time: 'just now', icon: 'person_add', tone: 'blue' },
    { actor: 'Rahul K.', text: 'resolved', ticket: '#HD-1038', time: '3 min ago', icon: 'check', tone: 'green' },
    { actor: 'Anita M.', text: 'added an internal note on', ticket: '#HD-1041', time: '7 min ago', icon: 'chat_bubble', tone: 'amber' },
    { text: 'SLA breach warning for', ticket: '#HD-1035', time: '12 min ago', icon: 'warning', tone: 'red' },
    { actor: 'Vijay K.', text: 'created new ticket', ticket: '#HD-1043', time: '18 min ago', icon: 'confirmation_number', tone: 'blue' }
  ];

  readonly quickActions: DashboardAction[] = [
    { label: 'Create ticket', icon: 'add_circle', tone: 'accent', meta: 'Capture request fast' },
    { label: 'Assign ticket', icon: 'person_add', tone: 'blue', meta: 'Route unowned work' },
    { label: 'View reports', icon: 'query_stats', tone: 'green', meta: 'Open analytics' },
    { label: 'Manage users', icon: 'manage_accounts', tone: 'amber', meta: 'Roles and access' }
  ];

  readonly notifications: NotificationItem[] = [
    { title: 'SLA breach risk', description: '#HD-1042 needs attention within 1 hour.', time: 'just now', icon: 'warning', tone: 'red', unread: true },
    { title: 'Assigned to you', description: '#HD-1041 was assigned by Priya S.', time: '3 min ago', icon: 'assignment_ind', tone: 'blue', unread: true },
    { title: 'New internal note', description: 'Anita M. commented on #HD-1040.', time: '7 min ago', icon: 'chat_bubble', tone: 'amber', unread: true },
    { title: 'Resolved', description: '#HD-1038 moved to resolved.', time: '11 min ago', icon: 'check_circle', tone: 'green' }
  ];

  readonly tickets: TicketSummaryItem[] = [
    { id: '#1042', title: 'Production server down', priority: 'Critical', priorityTone: 'red', status: 'In progress', statusTone: 'amber', assignee: 'Rahul K.', sla: '1h 12m', slaTone: 'red' },
    { id: '#1041', title: 'VPN disconnects after Windows update', priority: 'High', priorityTone: 'amber', status: 'Open', statusTone: 'blue', assignee: 'Anita M.', sla: '4h left', slaTone: 'amber' },
    { id: '#1040', title: 'Email not syncing on Outlook mobile', priority: 'Medium', priorityTone: 'blue', status: 'Open', statusTone: 'blue', assignee: 'Unassigned', sla: '8h left', slaTone: 'green' },
    { id: '#1039', title: 'CRM access request for sales team', priority: 'Low', priorityTone: 'green', status: 'Resolved', statusTone: 'green', assignee: 'Priya S.', sla: 'Met SLA', slaTone: 'green' }
  ];

  readonly isLoadingPreview = false;
}

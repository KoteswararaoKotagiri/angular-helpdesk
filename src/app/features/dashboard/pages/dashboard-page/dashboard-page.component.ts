import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize, forkJoin, of, catchError } from 'rxjs';
import { DashboardApi } from '../../../../api/dashboard.api';
import { SlaApi } from '../../../../api/sla.api';
import {
  ActivityResponse,
  DashboardChartsResponse,
  DashboardStatsResponse,
  RecentTicketResponse,
  SlaPerformanceResponse,
  SlaTicketResponse
} from '../../../../api/dtos';
import {
  ActivityItem,
  ChartWidgetModel,
  DashboardAction,
  DashboardFilter,
  DashboardTone,
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
    MatProgressSpinnerModule,
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
  private readonly dashboardApi = inject(DashboardApi);
  private readonly slaApi = inject(SlaApi);
  private readonly destroyRef = inject(DestroyRef);

  readonly todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  isLoading = false;
  error: string | null = null;

  filters: DashboardFilter[] = [];
  stats: StatCardModel[] = [];
  charts: ChartWidgetModel[] = [];
  slaItems: SlaItem[] = [];
  activities: ActivityItem[] = [];
  notifications: NotificationItem[] = [];
  tickets: TicketSummaryItem[] = [];

  // Quick actions are navigational shortcuts, not data — kept static.
  readonly quickActions: DashboardAction[] = [
    { label: 'Create ticket', icon: 'add_circle', tone: 'accent', meta: 'Capture request fast' },
    { label: 'Assign ticket', icon: 'person_add', tone: 'blue', meta: 'Route unowned work' },
    { label: 'View reports', icon: 'query_stats', tone: 'green', meta: 'Open analytics' },
    { label: 'Manage users', icon: 'manage_accounts', tone: 'amber', meta: 'Roles and access' }
  ];

  constructor() {
    this.loadDashboard();
  }

  get hasData(): boolean {
    return this.stats.length > 0 || this.tickets.length > 0 || this.charts.length > 0;
  }

  refresh(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.isLoading = true;
    this.error = null;

    forkJoin({
      stats: this.dashboardApi.getStats().pipe(catchError(() => of(null))),
      charts: this.dashboardApi.getCharts().pipe(catchError(() => of(null))),
      activity: this.dashboardApi.getActivity().pipe(catchError(() => of([] as ActivityResponse[]))),
      recent: this.dashboardApi.getRecentTickets().pipe(catchError(() => of([] as RecentTicketResponse[]))),
      performance: this.slaApi.getPerformance().pipe(catchError(() => of(null))),
      overdue: this.slaApi.getOverdue().pipe(catchError(() => of([] as SlaTicketResponse[]))),
      near: this.slaApi.getNearBreach().pipe(catchError(() => of([] as SlaTicketResponse[])))
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((res) => {
        const everythingFailed =
          !res.stats && !res.charts && !res.performance && res.activity.length === 0 && res.recent.length === 0;

        if (everythingFailed) {
          this.error = 'Unable to load dashboard data. Please check your connection and try again.';
          return;
        }

        this.stats = this.mapStats(res.stats);
        this.charts = this.mapCharts(res.charts);
        this.slaItems = this.mapPerformance(res.performance);
        this.activities = res.activity.map((item) => this.mapActivity(item));
        this.tickets = res.recent.map((ticket) => this.mapTicket(ticket));
        this.notifications = this.buildNotifications(res.overdue, res.near);
        this.filters = this.buildFilters(res.stats, res.overdue.length + res.near.length);
      });
  }

  private mapStats(stats: DashboardStatsResponse | null): StatCardModel[] {
    if (!stats) {
      return [];
    }

    return [
      { label: 'Open tickets', value: String(stats.openTickets), icon: 'confirmation_number', tone: 'blue', change: `${stats.assignedTickets} assigned`, changeDirection: 'neutral', meta: 'live' },
      { label: 'In progress', value: String(stats.inProgressTickets), icon: 'sync', tone: 'amber', change: 'Currently being worked', changeDirection: 'neutral', meta: 'active' },
      { label: 'Resolved', value: String(stats.resolvedTickets), icon: 'check_circle', tone: 'green', change: `${stats.closedTickets} closed`, changeDirection: 'up', meta: 'total' },
      { label: 'Critical tickets', value: String(stats.criticalTickets), icon: 'local_fire_department', tone: 'red', change: stats.criticalTickets > 0 ? 'Require attention' : 'None open', changeDirection: stats.criticalTickets > 0 ? 'down' : 'neutral', meta: 'p1' },
      { label: 'SLA breaches', value: String(stats.slaBreaches), icon: 'gpp_maybe', tone: stats.slaBreaches > 0 ? 'red' : 'green', change: stats.slaBreaches > 0 ? 'Needs immediate attention' : 'All within SLA', changeDirection: stats.slaBreaches > 0 ? 'down' : 'up', meta: 'risk' }
    ];
  }

  private mapCharts(charts: DashboardChartsResponse | null): ChartWidgetModel[] {
    if (!charts) {
      return [];
    }

    return [
      {
        title: 'Tickets by status',
        subtitle: 'Current',
        actionLabel: 'Full report',
        type: 'bar',
        series: charts.ticketsByStatus.map((point) => ({ label: point.label, value: point.value, tone: this.statusTone(point.label) }))
      },
      {
        title: 'Priority distribution',
        subtitle: 'Current queue',
        actionLabel: 'Drill in',
        type: 'donut',
        series: charts.ticketsByPriority.map((point) => ({ label: point.label, value: point.value, tone: this.priorityTone(point.label) }))
      },
      {
        title: 'Weekly ticket trend',
        subtitle: '7-day volume',
        type: 'line',
        series: charts.weeklyTrend.map((point) => ({ label: point.label, value: point.value, tone: 'accent' as DashboardTone }))
      }
    ];
  }

  private mapPerformance(performance: SlaPerformanceResponse | null): SlaItem[] {
    if (!performance) {
      return [];
    }

    const total = performance.totalEvaluated || 1;
    const pct = (value: number): number => Math.round((value / total) * 100);

    return [
      { label: 'Compliance', percent: Math.round(performance.compliancePercent), tone: performance.compliancePercent >= 90 ? 'green' : performance.compliancePercent >= 75 ? 'amber' : 'red', meta: `${performance.windowDays}-day window` },
      { label: 'On track', percent: pct(performance.onTrack), tone: 'green', meta: `${performance.onTrack} tickets` },
      { label: 'At risk', percent: pct(performance.atRisk), tone: 'amber', meta: `${performance.atRisk} tickets` },
      { label: 'Breached', percent: pct(performance.breached), tone: 'red', meta: `${performance.breached} tickets` }
    ];
  }

  private mapActivity(item: ActivityResponse): ActivityItem {
    return {
      actor: item.userName || undefined,
      text: item.description,
      ticket: item.ticketNumber ? `#${item.ticketNumber}` : undefined,
      time: this.relativeTime(item.timestamp),
      icon: this.activityIcon(item.activityType),
      tone: this.activityTone(item.activityType)
    };
  }

  private mapTicket(ticket: RecentTicketResponse): TicketSummaryItem {
    const closed = /resolved|closed/i.test(ticket.status);
    return {
      id: `#${ticket.ticketNumber}`,
      title: ticket.title,
      priority: ticket.priority,
      priorityTone: this.priorityTone(ticket.priority),
      status: ticket.status,
      statusTone: this.statusTone(ticket.status),
      assignee: ticket.assignee ?? 'Unassigned',
      sla: closed ? 'Met' : 'Active',
      slaTone: closed ? 'green' : 'neutral'
    };
  }

  private buildNotifications(overdue: SlaTicketResponse[], near: SlaTicketResponse[]): NotificationItem[] {
    const breaches = overdue.slice(0, 4).map((ticket): NotificationItem => ({
      title: 'SLA breach',
      description: `${ticket.ticketNumber} · ${ticket.title} is overdue`,
      time: `${Math.abs(Math.round(ticket.remainingMinutes))}m over`,
      icon: 'gpp_bad',
      tone: 'red',
      unread: true
    }));

    const warnings = near.slice(0, 4).map((ticket): NotificationItem => ({
      title: 'SLA warning',
      description: `${ticket.ticketNumber} · ${ticket.title} nearing SLA`,
      time: `${Math.max(0, Math.round(ticket.remainingMinutes))}m left`,
      icon: 'warning',
      tone: 'amber',
      unread: true
    }));

    return [...breaches, ...warnings].slice(0, 6);
  }

  private buildFilters(stats: DashboardStatsResponse | null, slaRisk: number): DashboardFilter[] {
    return [
      { label: 'All work', count: stats?.totalTickets ?? 0, active: true },
      { label: 'Open', count: stats?.openTickets, icon: 'inbox' },
      { label: 'SLA risk', count: slaRisk, icon: 'warning' },
      { label: 'Critical', count: stats?.criticalTickets, icon: 'local_fire_department' },
      { label: 'Resolved', count: stats?.resolvedTickets, icon: 'task_alt' }
    ];
  }

  private statusTone(status = ''): DashboardTone {
    const value = status.toLowerCase();
    if (value.includes('resolved') || value.includes('closed')) return 'green';
    if (value.includes('progress')) return 'amber';
    if (value.includes('assigned')) return 'purple';
    if (value.includes('hold')) return 'neutral';
    return 'blue';
  }

  private priorityTone(priority = ''): DashboardTone {
    const value = priority.toLowerCase();
    if (value.includes('critical')) return 'red';
    if (value.includes('high')) return 'amber';
    if (value.includes('low')) return 'green';
    return 'blue';
  }

  private activityIcon(type = ''): string {
    const value = type.toLowerCase();
    if (value.includes('created')) return 'confirmation_number';
    if (value.includes('assigned')) return 'person_add';
    if (value.includes('status')) return 'sync';
    if (value.includes('comment')) return 'chat_bubble';
    if (value.includes('attachment')) return 'attach_file';
    return 'bolt';
  }

  private activityTone(type = ''): DashboardTone {
    const value = type.toLowerCase();
    if (value.includes('created') || value.includes('assigned')) return 'blue';
    if (value.includes('status')) return 'green';
    if (value.includes('comment')) return 'amber';
    if (value.includes('attachment')) return 'purple';
    return 'neutral';
  }

  private relativeTime(timestamp: string): string {
    const then = new Date(timestamp).getTime();
    if (Number.isNaN(then)) return '';
    const diffSec = Math.max(0, Math.round((Date.now() - then) / 1000));
    if (diffSec < 60) return 'just now';
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.round(diffHr / 24)}d ago`;
  }
}

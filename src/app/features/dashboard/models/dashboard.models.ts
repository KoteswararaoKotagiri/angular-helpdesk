export type DashboardTone = 'accent' | 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'neutral';

export interface DashboardAction {
  label: string;
  icon: string;
  tone?: DashboardTone;
  meta?: string;
}

export interface DashboardFilter {
  label: string;
  count?: number;
  active?: boolean;
  icon?: string;
}

export interface StatCardModel {
  label: string;
  value: string;
  icon: string;
  tone: DashboardTone;
  change: string;
  changeDirection: 'up' | 'down' | 'neutral';
  meta?: string;
}

export interface ChartSeriesItem {
  label: string;
  value: number;
  tone: DashboardTone;
}

export interface ChartWidgetModel {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  type: 'bar' | 'donut' | 'line';
  series: ChartSeriesItem[];
  insight?: string;
}

export interface ActivityItem {
  actor?: string;
  text: string;
  ticket?: string;
  time: string;
  icon: string;
  tone: DashboardTone;
}

export interface NotificationItem {
  title: string;
  description: string;
  time: string;
  icon: string;
  tone: DashboardTone;
  unread?: boolean;
}

export interface SlaItem {
  label: string;
  percent: number;
  tone: DashboardTone;
  meta: string;
}

export interface TicketSummaryItem {
  id: string;
  title: string;
  priority: string;
  priorityTone: DashboardTone;
  status: string;
  statusTone: DashboardTone;
  assignee: string;
  sla: string;
  slaTone: DashboardTone;
}

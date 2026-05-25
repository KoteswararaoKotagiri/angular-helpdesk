export type TicketTone = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'neutral';

export interface TicketFilter {
  label: string;
  value: string;
  count?: number;
  active?: boolean;
  icon?: string;
  tone?: TicketTone;
}

export interface TicketRowModel {
  id: string;
  title: string;
  summary: string;
  requester: string;
  assignee: string;
  assigneeInitials: string;
  department: string;
  status: string;
  statusTone: TicketTone;
  priority: string;
  priorityTone: TicketTone;
  slaLabel: string;
  slaPercent: number;
  slaTone: TicketTone;
  created: string;
  updated: string;
  comments: number;
  attachments: number;
  activity: 'quiet' | 'active' | 'hot';
  unread?: boolean;
  selected?: boolean;
}

export interface TicketMetric {
  label: string;
  value: string;
  tone: TicketTone;
}

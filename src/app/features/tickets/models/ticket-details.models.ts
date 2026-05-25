import { TicketTone } from './ticket-list.models';

export type TicketParticipantRole = 'requester' | 'engineer' | 'system' | 'manager';
export type ConversationItemType = 'public' | 'internal';
export type TimelineTone = TicketTone | 'neutral';

export interface TicketParticipant {
  name: string;
  initials: string;
  role: TicketParticipantRole;
  title: string;
  online?: boolean;
}

export interface TicketAttachment {
  name: string;
  type: string;
  size: string;
  icon: string;
  addedBy: string;
  addedAt: string;
}

export interface ConversationItem {
  id: string;
  type: ConversationItemType;
  author: TicketParticipant;
  timestamp: string;
  body: string;
  status?: string;
  attachments?: TicketAttachment[];
  reactions?: string[];
}

export interface TimelineItem {
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  tone: TimelineTone;
}

export interface TicketWatcher {
  name: string;
  initials: string;
  online?: boolean;
}

export interface TicketDetail {
  id: string;
  title: string;
  requester: TicketParticipant;
  assignee: TicketParticipant;
  status: string;
  statusTone: TicketTone;
  priority: string;
  priorityTone: TicketTone;
  category: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  firstResponseDue: string;
  resolutionDue: string;
  slaPercent: number;
  slaTone: TicketTone;
  slaLabel: string;
  collaborators: TicketParticipant[];
  watchers: TicketWatcher[];
  tags: string[];
  conversation: ConversationItem[];
  timeline: TimelineItem[];
  attachments: TicketAttachment[];
}

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AttachmentApi } from '../../../../api/attachment.api';
import { CommentApi } from '../../../../api/comment.api';
import { AttachmentDto, CommentDto, TicketDto } from '../../../../api/dtos';
import { TicketApi } from '../../../../api/ticket.api';
import { ConversationItem, TicketAttachment, TicketDetail, TicketParticipantRole, TimelineItem } from '../../models/ticket-details.models';
import { ActivityTimelineComponent } from '../../ui/activity-timeline/activity-timeline.component';
import { AttachmentPanelComponent } from '../../ui/attachment-panel/attachment-panel.component';
import { ConversationThreadComponent } from '../../ui/conversation-thread/conversation-thread.component';
import { MetadataPanelComponent } from '../../ui/metadata-panel/metadata-panel.component';
import { QuickActionsPanelComponent } from '../../ui/quick-actions-panel/quick-actions-panel.component';
import { TicketHeaderComponent } from '../../ui/ticket-header/ticket-header.component';

@Component({
  selector: 'app-ticket-details-page',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ActivityTimelineComponent, AttachmentPanelComponent, ConversationThreadComponent, MetadataPanelComponent, QuickActionsPanelComponent, TicketHeaderComponent],
  templateUrl: './ticket-details-page.component.html',
  styleUrl: './ticket-details-page.component.scss'
})
export class TicketDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly ticketApi = inject(TicketApi);
  private readonly commentApi = inject(CommentApi);
  private readonly attachmentApi = inject(AttachmentApi);
  private readonly destroyRef = inject(DestroyRef);

  readonly routeTicketId = this.route.snapshot.paramMap.get('ticketId') ?? 'HD-1042';
  private apiTicketId: number | string = this.routeTicketId.replace('#', '');

  ticket: TicketDetail = {
    id: `#${this.routeTicketId}`,
    title: '',
    requester: { name: 'Requester', initials: 'RQ', role: 'requester', title: 'Requester' },
    assignee: { name: 'Unassigned', initials: 'UA', role: 'engineer', title: 'Support Engineer' },
    status: 'Open',
    statusTone: 'blue',
    priority: 'Medium',
    priorityTone: 'blue',
    category: 'General',
    department: 'Unassigned',
    createdAt: '',
    updatedAt: '',
    firstResponseDue: '',
    resolutionDue: '',
    slaPercent: 0,
    slaTone: 'neutral',
    slaLabel: 'No SLA',
    collaborators: [],
    watchers: [],
    tags: [],
    attachments: [],
    conversation: [],
    timeline: []
  };

  constructor() {
    this.loadTicket();
  }

  addComment(request: { body: string; isInternal: boolean }): void {
    this.commentApi.addComment(this.apiTicketId, request).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.loadComments()
    });
  }

  uploadAttachment(file: File): void {
    this.attachmentApi.uploadAttachment(this.apiTicketId, file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.loadAttachments()
    });
  }

  downloadAttachment(attachment: TicketAttachment): void {
    if (attachment.id === undefined) {
      return;
    }

    this.attachmentApi.downloadAttachment(this.apiTicketId, attachment.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.name;
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  private loadTicket(): void {
    this.ticketApi
      .getTickets({ search: this.apiTicketId, pageNumber: 1, pageSize: 20 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        const ticket = response.items.find((item) => String(item.id) === this.apiTicketId || item.ticketNumber === this.apiTicketId) ?? response.items[0];
        if (ticket) {
          this.apiTicketId = ticket.id;
          this.ticket = this.mapTicket(ticket);
        }
        this.loadDetails();
      });
  }

  private loadDetails(): void {
    forkJoin({
      comments: this.commentApi.getComments(this.apiTicketId),
      attachments: this.attachmentApi.getAttachments(this.apiTicketId)
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ comments, attachments }) => {
        this.ticket = {
          ...this.ticket,
          conversation: comments.map((comment) => this.mapComment(comment)),
          attachments: attachments.map((attachment) => this.mapAttachment(attachment)),
          timeline: comments.map((comment): TimelineItem => ({
            icon: comment.isInternal ? 'sticky_note_2' : 'chat_bubble',
            title: comment.isInternal ? 'Internal note added' : 'Comment added',
            description: comment.body,
            timestamp: formatDate(comment.createdAt),
            tone: comment.isInternal ? 'amber' : 'blue'
          }))
        };
      });
  }

  private loadComments(): void {
    this.commentApi.getComments(this.apiTicketId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((comments) => {
      this.ticket = { ...this.ticket, conversation: comments.map((comment) => this.mapComment(comment)) };
    });
  }

  private loadAttachments(): void {
    this.attachmentApi.getAttachments(this.apiTicketId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((attachments) => {
      this.ticket = { ...this.ticket, attachments: attachments.map((attachment) => this.mapAttachment(attachment)) };
    });
  }

  private mapTicket(ticket: TicketDto): TicketDetail {
    const requester = ticket.requesterName ?? 'Requester';
    const assignee = ticket.assigneeName ?? 'Unassigned';
    return {
      ...this.ticket,
      id: `#${ticket.ticketNumber ?? ticket.id}`,
      title: ticket.title,
      requester: { name: requester, initials: initials(requester), role: 'requester', title: 'Requester' },
      assignee: { name: assignee, initials: initials(assignee), role: 'engineer', title: 'Support Engineer' },
      status: ticket.statusName ?? 'Open',
      statusTone: statusTone(ticket.statusName),
      priority: ticket.priorityName ?? 'Medium',
      priorityTone: priorityTone(ticket.priorityName),
      category: ticket.categoryName ?? 'General',
      department: ticket.departmentName ?? 'Unassigned',
      createdAt: formatDate(ticket.createdAt),
      updatedAt: formatDate(ticket.updatedAt),
      firstResponseDue: formatDate(ticket.firstResponseDueAt),
      resolutionDue: formatDate(ticket.resolutionDueAt),
      slaLabel: ticket.resolutionDueAt ? 'Resolution due' : 'No SLA',
      tags: [ticket.departmentName, ticket.priorityName, ticket.statusName].filter((value): value is string => !!value)
    };
  }

  private mapComment(comment: CommentDto): ConversationItem {
    const author = comment.authorName ?? 'User';
    const role = normalizeRole(comment.authorRole);
    return {
      id: String(comment.id),
      type: comment.isInternal ? 'internal' as const : 'public' as const,
      author: { name: author, initials: initials(author), role, title: comment.authorRole ?? 'User' },
      timestamp: formatDate(comment.createdAt),
      body: comment.body,
      status: comment.isInternal ? 'Internal note' : 'Comment'
    };
  }

  private mapAttachment(attachment: AttachmentDto): TicketAttachment {
    return {
      id: attachment.id,
      name: attachment.fileName,
      type: attachment.contentType ?? 'File',
      size: formatBytes(attachment.fileSize),
      icon: attachmentIcon(attachment.contentType),
      addedBy: attachment.uploadedByName ?? 'User',
      addedAt: formatDate(attachment.uploadedAt),
      status: 'ready'
    };
  }
}

function initials(name: string): string {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'UA';
}

function normalizeRole(role = ''): TicketParticipantRole {
  const normalized = role.toLowerCase();
  if (normalized.includes('manager')) return 'manager';
  if (normalized.includes('engineer') || normalized.includes('agent')) return 'engineer';
  if (normalized.includes('system')) return 'system';
  return 'requester';
}

function statusTone(status = ''): TicketDetail['statusTone'] {
  const normalized = status.toLowerCase();
  if (normalized.includes('resolved') || normalized.includes('closed')) return 'green';
  if (normalized.includes('progress')) return 'amber';
  if (normalized.includes('hold')) return 'purple';
  return 'blue';
}

function priorityTone(priority = ''): TicketDetail['priorityTone'] {
  const normalized = priority.toLowerCase();
  if (normalized.includes('critical')) return 'red';
  if (normalized.includes('high')) return 'amber';
  if (normalized.includes('low')) return 'green';
  return 'blue';
}

function formatDate(value?: string): string {
  return value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Unknown';
}

function formatBytes(bytes = 0): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function attachmentIcon(contentType = ''): string {
  if (contentType.includes('image')) return 'image';
  if (contentType.includes('pdf')) return 'picture_as_pdf';
  if (contentType.includes('sheet') || contentType.includes('excel')) return 'table_chart';
  return 'description';
}

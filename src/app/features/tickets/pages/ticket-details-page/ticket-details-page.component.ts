import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TicketDetail } from '../../models/ticket-details.models';
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
  readonly routeTicketId = this.route.snapshot.paramMap.get('ticketId') ?? 'HD-1042';

  readonly ticket: TicketDetail = {
    id: `#${this.routeTicketId}`,
    title: 'Production server down - authentication service returning 503 errors',
    requester: { name: 'Koteswar Rao', initials: 'KR', role: 'requester', title: 'Employee, Finance Operations', online: true },
    assignee: { name: 'Rahul K.', initials: 'RK', role: 'engineer', title: 'L2 Support Engineer', online: true },
    status: 'In progress',
    statusTone: 'amber',
    priority: 'Critical',
    priorityTone: 'red',
    category: 'Infrastructure',
    department: 'IT Operations',
    createdAt: 'Today, 9:12 AM',
    updatedAt: 'Just now',
    firstResponseDue: 'met in 8m',
    resolutionDue: '1h 12m',
    slaPercent: 86,
    slaTone: 'red',
    slaLabel: 'Resolution at risk',
    collaborators: [
      { name: 'Anita M.', initials: 'AM', role: 'engineer', title: 'Incident Commander', online: true },
      { name: 'Priya S.', initials: 'PS', role: 'manager', title: 'Support Manager', online: true },
      { name: 'Vijay K.', initials: 'VK', role: 'engineer', title: 'Platform Engineer' }
    ],
    watchers: [
      { name: 'Anita M.', initials: 'AM', online: true },
      { name: 'Priya S.', initials: 'PS', online: true },
      { name: 'Vijay K.', initials: 'VK' },
      { name: 'HR Ops', initials: 'HO' }
    ],
    tags: ['production', 'auth-service', 'sla-risk', 'finance-impact'],
    attachments: [
      { name: 'auth-service-logs.txt', type: 'TXT', size: '420 KB', icon: 'description', addedBy: 'Rahul K.', addedAt: '6 min ago' },
      { name: 'error-screenshot.png', type: 'PNG', size: '1.8 MB', icon: 'image', addedBy: 'Koteswar Rao', addedAt: '18 min ago' },
      { name: 'incident-runbook.pdf', type: 'PDF', size: '860 KB', icon: 'picture_as_pdf', addedBy: 'Anita M.', addedAt: '24 min ago' }
    ],
    conversation: [
      {
        id: 'c1',
        type: 'public',
        author: { name: 'Koteswar Rao', initials: 'KR', role: 'requester', title: 'Requester', online: true },
        timestamp: 'Today, 9:12 AM',
        body: 'The finance team is unable to sign in. We are seeing intermittent 503 errors after entering MFA. Month-end approvals are blocked for about 40 users.',
        status: 'Customer reply',
        attachments: [{ name: 'error-screenshot.png', type: 'PNG', size: '1.8 MB', icon: 'image', addedBy: 'Koteswar Rao', addedAt: '18 min ago' }]
      },
      {
        id: 'c2',
        type: 'public',
        author: { name: 'Rahul K.', initials: 'RK', role: 'engineer', title: 'L2 Support Engineer', online: true },
        timestamp: 'Today, 9:19 AM',
        body: 'Thanks for the details. We can reproduce the 503 from the auth gateway and have moved this to critical priority. We are checking the deployment health and will keep this thread updated every 15 minutes.',
        status: 'Engineer reply'
      },
      {
        id: 'c3',
        type: 'internal',
        author: { name: 'Anita M.', initials: 'AM', role: 'engineer', title: 'Incident Commander', online: true },
        timestamp: 'Today, 9:23 AM',
        body: 'Internal: rollback candidate is v2.18.4. Vijay is checking gateway saturation first so we do not rollback unnecessarily. Keep customer updates concise and avoid ETA until confirmed.'
      },
      {
        id: 'c4',
        type: 'public',
        author: { name: 'Rahul K.', initials: 'RK', role: 'engineer', title: 'L2 Support Engineer', online: true },
        timestamp: 'Today, 9:31 AM',
        body: 'We found elevated latency in the authentication gateway and are applying a mitigation now. Users may see sign-in succeed after retrying once. We will confirm when the service is fully stable.',
        status: 'Pinned update',
        attachments: [{ name: 'auth-service-logs.txt', type: 'TXT', size: '420 KB', icon: 'description', addedBy: 'Rahul K.', addedAt: '6 min ago' }]
      }
    ],
    timeline: [
      { icon: 'bolt', title: 'Live collaboration started', description: '3 teammates joined the workspace.', timestamp: 'Just now', tone: 'green' },
      { icon: 'attach_file', title: 'Logs attached', description: 'Rahul added auth-service-logs.txt.', timestamp: '6 min ago', tone: 'blue' },
      { icon: 'priority_high', title: 'Priority raised', description: 'Priority changed from High to Critical.', timestamp: '14 min ago', tone: 'red' },
      { icon: 'person', title: 'Assigned to Rahul K.', description: 'Auto-routing matched IT Operations queue.', timestamp: '18 min ago', tone: 'amber' },
      { icon: 'add_circle', title: 'Ticket created', description: 'Koteswar opened the incident from the employee portal.', timestamp: '29 min ago', tone: 'neutral' }
    ]
  };
}

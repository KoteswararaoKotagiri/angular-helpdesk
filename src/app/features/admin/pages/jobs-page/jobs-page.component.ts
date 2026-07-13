import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environments/environment';

interface RecurringJob {
  name: string;
  description: string;
  schedule: string;
  queue: string;
}

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.scss'
})
export class JobsPageComponent {
  // The Hangfire server hosts the live job dashboard (scheduled / recurring / failed / history / details).
  readonly dashboardUrl = `${environment.apiUrl}/hangfire`;

  // Reflects the recurring jobs configured on the server (Hangfire section in appsettings.json).
  readonly recurringJobs: RecurringJob[] = [
    { name: 'SLA monitoring', description: 'Detect overdue / near-breach tickets, persist due dates, escalate.', schedule: 'Every 15 minutes', queue: 'default' },
    { name: 'Reminder emails', description: 'Send reminder digests to engineers for open work.', schedule: 'Every 4 hours', queue: 'default' },
    { name: 'Daily report', description: 'Ticket totals, SLA compliance and engineer performance to admins.', schedule: 'Daily at 07:00', queue: 'default' },
    { name: 'Cleanup', description: 'Remove expired audit logs and orphaned upload files.', schedule: 'Daily at 02:00', queue: 'default' },
    { name: 'Scheduled notifications', description: 'Weekly SLA summary to administrators.', schedule: 'Mondays at 08:00', queue: 'default' }
  ];

  openDashboard(): void {
    window.open(this.dashboardUrl, '_blank', 'noopener');
  }
}

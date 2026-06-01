import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminMetric, ConfigurationItem, SettingSection } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { ConfigurationCardComponent } from '../../ui/configuration-card/configuration-card.component';
import { SettingsPanelComponent } from '../../ui/settings-panel/settings-panel.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, AdminHeaderComponent, ConfigurationCardComponent, SettingsPanelComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  readonly metrics: AdminMetric[] = [
    { label: 'Workflows', value: '4', icon: 'account_tree', tone: 'blue', meta: 'Ticket lifecycle rules' },
    { label: 'SLA policies', value: '6', icon: 'timer', tone: 'green', meta: '94% compliance' },
    { label: 'Integrations', value: '5', icon: 'hub', tone: 'purple', meta: '3 connected' },
    { label: 'Storage used', value: '78%', icon: 'cloud', tone: 'amber', meta: 'Attachment storage' }
  ];

  readonly configuration: ConfigurationItem[] = [
    { title: 'Priorities', description: 'Define business impact, urgency language, and queue sorting behavior.', icon: 'priority_high', tone: 'red', meta: '4 priority levels' },
    { title: 'Statuses', description: 'Configure ticket lifecycle states, transitions, and resolution categories.', icon: 'linear_scale', tone: 'blue', meta: '7 statuses active' },
    { title: 'Categories', description: 'Manage request categories, default owners, forms, and routing paths.', icon: 'category', tone: 'purple', meta: '42 categories' },
    { title: 'SLA rules', description: 'Set response targets, breach warnings, escalations, and business calendars.', icon: 'timer', tone: 'amber', meta: '6 policies' }
  ];

  readonly sections: SettingSection[] = [
    { title: 'Branding', description: 'Workspace name, logo, product color, and customer-facing labels.', icon: 'palette', status: 'Ready', items: ['Logo and favicon', 'Portal theme', 'Email brand tokens'] },
    { title: 'Notifications', description: 'Realtime, email, and escalation notification defaults.', icon: 'notifications', status: 'Ready', items: ['SignalR channels', 'Email templates', 'Escalation recipients'] },
    { title: 'Email settings', description: 'Inbound mailbox behavior, outbound sender identity, and reply handling.', icon: 'mark_email_read', status: 'Draft', items: ['SMTP profile', 'Mailbox parser', 'Reply threading'] },
    { title: 'Integrations', description: 'Connect identity providers, chat tools, monitoring, and external systems.', icon: 'hub', status: 'Ready', items: ['SSO placeholder', 'Teams and Slack', 'Monitoring alerts'] },
    { title: 'AI settings', description: 'Future controls for summaries, routing suggestions, and response assistance.', icon: 'auto_awesome', status: 'Draft', items: ['Suggested replies', 'Ticket summarization', 'Routing confidence'] },
    { title: 'File storage', description: 'Attachment policies, limits, retention, scanning, and storage provider settings.', icon: 'folder', status: 'Review', items: ['Quota management', 'Retention windows', 'Malware scanning'] }
  ];
}

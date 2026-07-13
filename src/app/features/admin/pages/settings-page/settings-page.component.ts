import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

interface NotificationEvent {
  name: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  // Reflects the server-side EmailSettings model (appsettings.json). Managed via configuration —
  // there is no self-service settings API, so this view is read-only reference.
  readonly notificationEvents: NotificationEvent[] = [
    { name: 'Ticket Created', description: 'Notify the requester when a ticket is created.', enabled: true },
    { name: 'Ticket Assigned', description: 'Notify the assigned engineer.', enabled: true },
    { name: 'Ticket Status Changed', description: 'Notify the requester on status updates.', enabled: true },
    { name: 'Comment Added', description: 'Notify the requester when a comment is added.', enabled: true },
    { name: 'Ticket Closed', description: 'Notify the requester when a ticket is closed.', enabled: true }
  ];
}

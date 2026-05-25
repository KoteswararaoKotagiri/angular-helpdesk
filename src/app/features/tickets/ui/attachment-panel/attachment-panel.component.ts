import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketAttachment } from '../../models/ticket-details.models';

@Component({
  selector: 'app-attachment-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './attachment-panel.component.html',
  styleUrl: './attachment-panel.component.scss'
})
export class AttachmentPanelComponent {
  @Input({ required: true }) attachments: TicketAttachment[] = [];
}

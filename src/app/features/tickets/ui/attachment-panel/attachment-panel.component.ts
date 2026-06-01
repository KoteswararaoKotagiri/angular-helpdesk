import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketAttachment } from '../../models/ticket-details.models';
import { AttachmentCardComponent } from '../attachment-card/attachment-card.component';
import { UploadZoneComponent } from '../upload-zone/upload-zone.component';

@Component({
  selector: 'app-attachment-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, AttachmentCardComponent, UploadZoneComponent],
  templateUrl: './attachment-panel.component.html',
  styleUrl: './attachment-panel.component.scss'
})
export class AttachmentPanelComponent {
  @Input({ required: true }) attachments: TicketAttachment[] = [];
  @Output() fileSelected = new EventEmitter<File>();
  @Output() downloadRequested = new EventEmitter<TicketAttachment>();
}

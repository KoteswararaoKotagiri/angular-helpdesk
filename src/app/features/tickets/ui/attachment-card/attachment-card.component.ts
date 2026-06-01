import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketAttachment } from '../../models/ticket-details.models';
import { FilePreviewComponent } from '../file-preview/file-preview.component';

@Component({
  selector: 'app-attachment-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatTooltipModule, FilePreviewComponent],
  templateUrl: './attachment-card.component.html',
  styleUrl: './attachment-card.component.scss'
})
export class AttachmentCardComponent {
  @Input({ required: true }) attachment!: TicketAttachment;
  @Input() compact = false;
  @Output() downloadRequested = new EventEmitter<TicketAttachment>();
}

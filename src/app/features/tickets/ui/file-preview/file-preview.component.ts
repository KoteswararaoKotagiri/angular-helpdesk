import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TicketAttachment } from '../../models/ticket-details.models';

@Component({
  selector: 'app-file-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './file-preview.component.html',
  styleUrl: './file-preview.component.scss'
})
export class FilePreviewComponent {
  @Input({ required: true }) attachment!: TicketAttachment;

  get previewClass(): string {
    return `preview--${this.attachment.previewKind ?? 'document'}`;
  }
}

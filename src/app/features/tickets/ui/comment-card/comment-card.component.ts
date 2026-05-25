import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConversationItem } from '../../models/ticket-details.models';
import { AttachmentCardComponent } from '../attachment-card/attachment-card.component';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatChipsModule, MatIconModule, MatMenuModule, MatTooltipModule, AttachmentCardComponent],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
  @Input({ required: true }) item!: ConversationItem;
}

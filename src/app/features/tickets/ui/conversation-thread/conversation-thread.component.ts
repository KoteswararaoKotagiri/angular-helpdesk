import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConversationItem } from '../../models/ticket-details.models';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { InternalNoteCardComponent } from '../internal-note-card/internal-note-card.component';

@Component({
  selector: 'app-conversation-thread',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatButtonToggleModule, MatIconModule, MatTooltipModule, CommentCardComponent, InternalNoteCardComponent],
  templateUrl: './conversation-thread.component.html',
  styleUrl: './conversation-thread.component.scss'
})
export class ConversationThreadComponent {
  @Input({ required: true }) items: ConversationItem[] = [];
}

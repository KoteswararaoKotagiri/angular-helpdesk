import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ConversationItem } from '../../models/ticket-details.models';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { ConversationToolbarComponent } from '../conversation-toolbar/conversation-toolbar.component';
import { InternalNoteCardComponent } from '../internal-note-card/internal-note-card.component';
import { MessageComposerComponent } from '../message-composer/message-composer.component';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator.component';

@Component({
  selector: 'app-conversation-thread',
  standalone: true,
  imports: [CommonModule, MatIconModule, CommentCardComponent, ConversationToolbarComponent, InternalNoteCardComponent, MessageComposerComponent, TypingIndicatorComponent],
  templateUrl: './conversation-thread.component.html',
  styleUrl: './conversation-thread.component.scss'
})
export class ConversationThreadComponent {
  @Input({ required: true }) items: ConversationItem[] = [];
  @Output() commentSubmitted = new EventEmitter<{ body: string; isInternal: boolean }>();

  get activeParticipants(): number {
    return new Set(this.items.map((item) => item.author.name)).size;
  }
}

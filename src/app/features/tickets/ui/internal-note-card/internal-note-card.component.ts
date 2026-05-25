import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConversationItem } from '../../models/ticket-details.models';

@Component({
  selector: 'app-internal-note-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './internal-note-card.component.html',
  styleUrl: './internal-note-card.component.scss'
})
export class InternalNoteCardComponent {
  @Input({ required: true }) item!: ConversationItem;
}

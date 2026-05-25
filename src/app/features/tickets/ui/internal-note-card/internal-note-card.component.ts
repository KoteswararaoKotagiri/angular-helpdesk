import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConversationItem } from '../../models/ticket-details.models';

@Component({
  selector: 'app-internal-note-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatChipsModule, MatIconModule, MatTooltipModule],
  templateUrl: './internal-note-card.component.html',
  styleUrl: './internal-note-card.component.scss'
})
export class InternalNoteCardComponent {
  @Input({ required: true }) item!: ConversationItem;
}

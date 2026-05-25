import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketTone } from '../../models/ticket-list.models';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="chip" [ngClass]="'tone-' + tone">{{ label }}</span>`,
  styleUrl: './status-chip.component.scss'
})
export class StatusChipComponent {
  @Input({ required: true }) label = '';
  @Input() tone: TicketTone = 'neutral';
}

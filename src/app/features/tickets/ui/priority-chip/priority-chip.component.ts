import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TicketTone } from '../../models/ticket-list.models';

@Component({
  selector: 'app-priority-chip',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './priority-chip.component.html',
  styleUrl: './priority-chip.component.scss'
})
export class PriorityChipComponent {
  @Input({ required: true }) label = '';
  @Input() tone: TicketTone = 'neutral';
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TicketTone } from '../../models/ticket-list.models';

@Component({
  selector: 'app-ticket-sla-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './sla-widget.component.html',
  styleUrl: './sla-widget.component.scss'
})
export class SlaWidgetComponent {
  @Input() label = '';
  @Input() percent = 0;
  @Input() firstResponseDue = '';
  @Input() resolutionDue = '';
  @Input() tone: TicketTone = 'green';
}

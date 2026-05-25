import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TicketDetail } from '../../models/ticket-details.models';
import { PriorityChipComponent } from '../priority-chip/priority-chip.component';
import { RealtimeIndicatorComponent } from '../realtime-indicator/realtime-indicator.component';
import { StatusChipComponent } from '../status-chip/status-chip.component';

@Component({
  selector: 'app-ticket-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatChipsModule, MatIconModule, MatMenuModule, MatTooltipModule, PriorityChipComponent, RealtimeIndicatorComponent, StatusChipComponent],
  templateUrl: './ticket-header.component.html',
  styleUrl: './ticket-header.component.scss'
})
export class TicketHeaderComponent {
  @Input({ required: true }) ticket!: TicketDetail;
}

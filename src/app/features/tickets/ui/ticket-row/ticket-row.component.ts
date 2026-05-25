import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { TicketRowModel } from '../../models/ticket-list.models';
import { PriorityChipComponent } from '../priority-chip/priority-chip.component';
import { QuickActionsMenuComponent } from '../quick-actions-menu/quick-actions-menu.component';
import { StatusChipComponent } from '../status-chip/status-chip.component';

@Component({
  selector: 'app-ticket-row',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCheckboxModule, MatIconModule, MatProgressBarModule, MatTooltipModule, PriorityChipComponent, QuickActionsMenuComponent, StatusChipComponent],
  templateUrl: './ticket-row.component.html',
  styleUrl: './ticket-row.component.scss'
})
export class TicketRowComponent {
  @Input({ required: true }) ticket!: TicketRowModel;

  get detailsRoute(): string[] {
    return ['/tickets', this.ticket.id.replace('#', '')];
  }
}

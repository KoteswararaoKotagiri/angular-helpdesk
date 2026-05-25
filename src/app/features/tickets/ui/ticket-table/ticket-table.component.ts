import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketRowModel } from '../../models/ticket-list.models';
import { TicketRowComponent } from '../ticket-row/ticket-row.component';

@Component({
  selector: 'app-ticket-table',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule, MatTooltipModule, TicketRowComponent],
  templateUrl: './ticket-table.component.html',
  styleUrl: './ticket-table.component.scss'
})
export class TicketTableComponent {
  @Input() tickets: TicketRowModel[] = [];
}

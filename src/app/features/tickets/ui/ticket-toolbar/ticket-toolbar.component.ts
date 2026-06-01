import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TicketMetric } from '../../models/ticket-list.models';

@Component({
  selector: 'app-ticket-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './ticket-toolbar.component.html',
  styleUrl: './ticket-toolbar.component.scss'
})
export class TicketToolbarComponent {
  @Input() metrics: TicketMetric[] = [];
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() refreshed = new EventEmitter<void>();
}

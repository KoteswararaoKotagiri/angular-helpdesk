import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TicketFilter } from '../../models/ticket-list.models';
import { DepartmentDto, TicketPriorityDto, TicketStatusDto } from '../../../../api/dtos';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatChipsModule, MatIconModule, MatMenuModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Input() filters: TicketFilter[] = [];
  @Input() statuses: TicketStatusDto[] = [];
  @Input() priorities: TicketPriorityDto[] = [];
  @Input() departments: DepartmentDto[] = [];
  @Output() filterSelected = new EventEmitter<TicketFilter>();
  @Output() statusSelected = new EventEmitter<TicketStatusDto>();
  @Output() prioritySelected = new EventEmitter<TicketPriorityDto>();
  @Output() departmentSelected = new EventEmitter<DepartmentDto>();
  @Output() resetSelected = new EventEmitter<void>();
}

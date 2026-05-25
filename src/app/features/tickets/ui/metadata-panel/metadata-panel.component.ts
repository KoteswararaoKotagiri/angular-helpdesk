import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TicketDetail } from '../../models/ticket-details.models';
import { PriorityChipComponent } from '../priority-chip/priority-chip.component';
import { SlaWidgetComponent } from '../sla-widget/sla-widget.component';
import { StatusChipComponent } from '../status-chip/status-chip.component';

@Component({
  selector: 'app-metadata-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatChipsModule, MatIconModule, PriorityChipComponent, SlaWidgetComponent, StatusChipComponent],
  templateUrl: './metadata-panel.component.html',
  styleUrl: './metadata-panel.component.scss'
})
export class MetadataPanelComponent {
  @Input({ required: true }) ticket!: TicketDetail;
}

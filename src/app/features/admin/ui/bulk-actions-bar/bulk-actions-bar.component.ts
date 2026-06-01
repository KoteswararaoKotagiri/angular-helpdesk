import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-bulk-actions-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './bulk-actions-bar.component.html',
  styleUrl: './bulk-actions-bar.component.scss'
})
export class BulkActionsBarComponent {
  @Input() selectedCount = 0;
  @Input() context = 'records';
}

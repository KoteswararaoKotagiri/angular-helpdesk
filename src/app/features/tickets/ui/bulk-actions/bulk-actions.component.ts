import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bulk-actions',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './bulk-actions.component.html',
  styleUrl: './bulk-actions.component.scss'
})
export class BulkActionsComponent {
  @Input() selectedCount = 0;
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuditLogRow } from '../../models/admin.models';

@Component({
  selector: 'app-admin-audit-log-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './audit-log-table.component.html',
  styleUrl: './audit-log-table.component.scss'
})
export class AuditLogTableComponent {
  @Input() logs: AuditLogRow[] = [];
}

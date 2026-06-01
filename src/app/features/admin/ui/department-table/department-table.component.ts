import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DepartmentRow } from '../../models/admin.models';

@Component({
  selector: 'app-admin-department-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './department-table.component.html',
  styleUrl: './department-table.component.scss'
})
export class DepartmentTableComponent {
  @Input() departments: DepartmentRow[] = [];
}

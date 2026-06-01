import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoleRow } from '../../models/admin.models';

@Component({
  selector: 'app-admin-role-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './role-table.component.html',
  styleUrl: './role-table.component.scss'
})
export class RoleTableComponent {
  @Input() roles: RoleRow[] = [];
}

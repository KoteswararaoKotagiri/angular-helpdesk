import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminNavItem } from './models/admin.models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  readonly navItems: AdminNavItem[] = [
    { label: 'Overview', route: '/admin/dashboard', icon: 'space_dashboard' },
    { label: 'Users', route: '/admin/users', icon: 'group', badge: '248' },
    { label: 'Roles', route: '/admin/roles', icon: 'admin_panel_settings' },
    { label: 'Permissions', route: '/admin/permissions', icon: 'lock' },
    { label: 'Departments', route: '/admin/departments', icon: 'business' },
    { label: 'Settings', route: '/admin/settings', icon: 'tune' },
    { label: 'Audit logs', route: '/admin/audit-logs', icon: 'fact_check' }
  ];
}

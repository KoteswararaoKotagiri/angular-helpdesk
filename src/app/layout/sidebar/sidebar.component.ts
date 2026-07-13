import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarNavItem {
  label: string;
  icon: string;
  route: string;
  badge?: string;
  neutral?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() closeMobile = new EventEmitter<void>();

  readonly primaryNavItems: SidebarNavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Tickets', icon: 'confirmation_number', route: '/tickets' },
    { label: 'SLA', icon: 'schedule', route: '/sla' }
  ];

  readonly workNavItems: SidebarNavItem[] = [
    { label: 'Assigned to me', icon: 'assignment_ind', route: '/tickets' },
    { label: 'SLA at risk', icon: 'warning', route: '/sla' },
    { label: 'My profile', icon: 'account_circle', route: '/profile' }
  ];

  readonly managementNavItems: SidebarNavItem[] = [
    { label: 'Admin panel', icon: 'settings', route: '/admin/dashboard' },
    { label: 'Users', icon: 'group', route: '/admin/users' },
    { label: 'Departments', icon: 'business', route: '/admin/departments' },
    { label: 'Audit logs', icon: 'description', route: '/admin/audit-logs' },
    { label: 'Email settings', icon: 'mail', route: '/admin/settings' },
    { label: 'Background jobs', icon: 'schedule_send', route: '/admin/jobs' }
  ];
}

import { Component } from '@angular/core';
import { AdminMetric, PermissionGroup } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { PermissionMatrixComponent } from '../../ui/permission-matrix/permission-matrix.component';

@Component({
  selector: 'app-permissions-page',
  standalone: true,
  imports: [AdminHeaderComponent, PermissionMatrixComponent],
  templateUrl: './permissions-page.component.html',
  styleUrl: './permissions-page.component.scss'
})
export class PermissionsPageComponent {
  readonly metrics: AdminMetric[] = [
    { label: 'Permission groups', value: '6', icon: 'account_tree', tone: 'blue', meta: 'Grouped by domain' },
    { label: 'Managed permissions', value: '48', icon: 'lock', tone: 'purple', meta: '4 role columns' },
    { label: 'Privileged grants', value: '14', icon: 'gpp_maybe', tone: 'amber', meta: 'Admin review required' },
    { label: 'Audit coverage', value: '100%', icon: 'fact_check', tone: 'green', meta: 'Changes recorded' }
  ];

  readonly groups: PermissionGroup[] = [
    {
      name: 'Identity administration',
      icon: 'manage_accounts',
      permissions: [
        { name: 'Create and invite users', description: 'Provision new accounts and send onboarding invitations.', admin: true, manager: true, engineer: false, requester: false },
        { name: 'Deactivate users', description: 'Disable access while retaining audit history.', admin: true, manager: false, engineer: false, requester: false },
        { name: 'Assign departments', description: 'Move users between departments and ownership groups.', admin: true, manager: true, engineer: false, requester: false }
      ]
    },
    {
      name: 'Ticket operations',
      icon: 'confirmation_number',
      permissions: [
        { name: 'Manage ticket workflows', description: 'Create statuses, transitions, and operational queues.', admin: true, manager: true, engineer: false, requester: false },
        { name: 'Reassign tickets', description: 'Move work between engineers and departments.', admin: true, manager: true, engineer: true, requester: false },
        { name: 'View internal notes', description: 'Read private support collaboration threads.', admin: true, manager: true, engineer: true, requester: false }
      ]
    },
    {
      name: 'Security and audit',
      icon: 'policy',
      permissions: [
        { name: 'View audit logs', description: 'Search administrative, login, and configuration events.', admin: true, manager: true, engineer: false, requester: false },
        { name: 'Change permission matrix', description: 'Modify role permission assignments.', admin: true, manager: false, engineer: false, requester: false },
        { name: 'Export compliance evidence', description: 'Download audit-ready event reports.', admin: true, manager: true, engineer: false, requester: false }
      ]
    }
  ];
}

import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MasterApi } from '../../../../api/master.api';
import { RoleDto } from '../../../../api/dtos';
import { AdminMetric, FilterOption, RoleRow } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { FilterToolbarComponent } from '../../ui/filter-toolbar/filter-toolbar.component';
import { RoleTableComponent } from '../../ui/role-table/role-table.component';

@Component({
  selector: 'app-roles-page',
  standalone: true,
  imports: [AdminHeaderComponent, FilterToolbarComponent, RoleTableComponent],
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.scss'
})
export class RolesPageComponent {
  private readonly masterApi = inject(MasterApi);
  private readonly destroyRef = inject(DestroyRef);

  metrics: AdminMetric[] = [
    { label: 'Roles', value: '0', icon: 'admin_panel_settings', tone: 'purple', meta: 'Loaded from API' },
    { label: 'Assigned users', value: '0', icon: 'group', tone: 'blue', meta: 'Loaded from API' },
    { label: 'System roles', value: '0', icon: 'shield', tone: 'amber', meta: 'Loaded from API' },
    { label: 'Custom roles', value: '0', icon: 'extension', tone: 'green', meta: 'Loaded from API' }
  ];

  filters: FilterOption[] = [
    { label: 'All roles', count: 0, active: true },
    { label: 'System', count: 0 },
    { label: 'Custom', count: 0 }
  ];

  roles: RoleRow[] = [];

  constructor() {
    this.masterApi.getRoles().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((roles) => {
      const systemCount = roles.filter((role) => role.isSystemRole).length;
      const assignedUsers = roles.reduce((total, role) => total + (role.userCount ?? 0), 0);
      this.roles = roles.map((role, index) => this.mapRole(role, index));
      this.metrics = [
        { label: 'Roles', value: String(roles.length), icon: 'admin_panel_settings', tone: 'purple', meta: 'Loaded from API' },
        { label: 'Assigned users', value: String(assignedUsers), icon: 'group', tone: 'blue', meta: 'Loaded from API' },
        { label: 'System roles', value: String(systemCount), icon: 'shield', tone: 'amber', meta: 'Loaded from API' },
        { label: 'Custom roles', value: String(roles.length - systemCount), icon: 'extension', tone: 'green', meta: 'Loaded from API' }
      ];
      this.filters = [
        { label: 'All roles', count: roles.length, active: true },
        { label: 'System', count: systemCount },
        { label: 'Custom', count: roles.length - systemCount }
      ];
    });
  }

  private mapRole(role: RoleDto, index: number): RoleRow {
    const tones: RoleRow['tone'][] = ['purple', 'blue', 'green', 'amber'];
    return {
      name: role.name,
      description: role.description ?? '',
      level: role.isSystemRole ? 'System' : 'Custom',
      users: role.userCount ?? 0,
      permissions: role.permissionCount ?? 0,
      system: role.isSystemRole ?? false,
      tone: tones[index % tones.length]
    };
  }
}

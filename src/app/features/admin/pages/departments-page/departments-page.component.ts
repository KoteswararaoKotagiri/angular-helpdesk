import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DepartmentDto } from '../../../../api/dtos';
import { MasterApi } from '../../../../api/master.api';
import { AdminMetric, DepartmentRow, FilterOption } from '../../models/admin.models';
import { AdminHeaderComponent } from '../../ui/admin-header/admin-header.component';
import { DepartmentTableComponent } from '../../ui/department-table/department-table.component';
import { FilterToolbarComponent } from '../../ui/filter-toolbar/filter-toolbar.component';

@Component({
  selector: 'app-departments-page',
  standalone: true,
  imports: [AdminHeaderComponent, DepartmentTableComponent, FilterToolbarComponent],
  templateUrl: './departments-page.component.html',
  styleUrl: './departments-page.component.scss'
})
export class DepartmentsPageComponent {
  private readonly masterApi = inject(MasterApi);
  private readonly destroyRef = inject(DestroyRef);

  metrics: AdminMetric[] = [
    { label: 'Departments', value: '0', icon: 'business', tone: 'blue', meta: 'Loaded from API' },
    { label: 'Owners', value: '0', icon: 'supervisor_account', tone: 'green', meta: 'Loaded from API' },
    { label: 'Engineers', value: '0', icon: 'engineering', tone: 'purple', meta: 'Loaded from API' },
    { label: 'Inactive', value: '0', icon: 'warning', tone: 'amber', meta: 'Loaded from API' }
  ];

  filters: FilterOption[] = [
    { label: 'All', count: 0, active: true },
    { label: 'Active', count: 0, tone: 'green' },
    { label: 'Inactive', count: 0 }
  ];

  departments: DepartmentRow[] = [];

  constructor() {
    this.masterApi.getDepartments().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((departments) => {
      const activeCount = departments.filter((department) => department.isActive !== false).length;
      const ownerCount = new Set(departments.map((department) => department.ownerName).filter(Boolean)).size;
      const engineerCount = departments.reduce((total, department) => total + (department.engineerCount ?? 0), 0);
      this.departments = departments.map((department) => this.mapDepartment(department));
      this.metrics = [
        { label: 'Departments', value: String(departments.length), icon: 'business', tone: 'blue', meta: 'Loaded from API' },
        { label: 'Owners', value: String(ownerCount), icon: 'supervisor_account', tone: 'green', meta: 'Loaded from API' },
        { label: 'Engineers', value: String(engineerCount), icon: 'engineering', tone: 'purple', meta: 'Loaded from API' },
        { label: 'Inactive', value: String(departments.length - activeCount), icon: 'warning', tone: 'amber', meta: 'Loaded from API' }
      ];
      this.filters = [
        { label: 'All', count: departments.length, active: true },
        { label: 'Active', count: activeCount, tone: 'green' },
        { label: 'Inactive', count: departments.length - activeCount }
      ];
    });
  }

  private mapDepartment(department: DepartmentDto): DepartmentRow {
    return {
      name: department.name,
      owner: department.ownerName ?? 'Unassigned',
      status: department.isActive === false ? 'Inactive' : 'Active',
      users: department.userCount ?? 0,
      engineers: department.engineerCount ?? 0,
      categories: department.categoryCount ?? 0,
      sla: department.slaPolicyName ?? ''
    };
  }
}

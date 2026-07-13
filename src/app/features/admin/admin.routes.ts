import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent)
      },
      {
        path: 'roles',
        loadComponent: () => import('./pages/roles-page/roles-page.component').then((m) => m.RolesPageComponent)
      },
      {
        path: 'permissions',
        loadComponent: () =>
          import('./pages/permissions-page/permissions-page.component').then((m) => m.PermissionsPageComponent)
      },
      {
        path: 'departments',
        loadComponent: () =>
          import('./pages/departments-page/departments-page.component').then((m) => m.DepartmentsPageComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings-page/settings-page.component').then((m) => m.SettingsPageComponent)
      },
      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./pages/audit-logs-page/audit-logs-page.component').then((m) => m.AuditLogsPageComponent)
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/jobs-page/jobs-page.component').then((m) => m.JobsPageComponent)
      }
    ]
  }
];

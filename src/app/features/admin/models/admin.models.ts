export type AdminTone = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'neutral';

export interface AdminMetric {
  label: string;
  value: string;
  icon: string;
  tone: AdminTone;
  meta: string;
}

export interface AdminNavItem {
  label: string;
  route: string;
  icon: string;
  badge?: string;
}

export interface FilterOption {
  label: string;
  count?: number;
  active?: boolean;
  tone?: AdminTone;
}

export interface UserRow {
  name: string;
  email: string;
  initials: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Invited';
  statusTone: AdminTone;
  lastSeen: string;
  tickets: number;
  selected?: boolean;
}

export interface RoleRow {
  name: string;
  description: string;
  level: string;
  users: number;
  permissions: number;
  system: boolean;
  tone: AdminTone;
}

export interface PermissionGroup {
  name: string;
  icon: string;
  permissions: PermissionItem[];
}

export interface PermissionItem {
  name: string;
  description: string;
  admin: boolean;
  manager: boolean;
  engineer: boolean;
  requester: boolean;
}

export interface DepartmentRow {
  name: string;
  owner: string;
  status: 'Active' | 'Inactive';
  users: number;
  engineers: number;
  categories: number;
  sla: string;
}

export interface ConfigurationItem {
  title: string;
  description: string;
  icon: string;
  tone: AdminTone;
  meta: string;
  progress?: number;
}

export interface SettingSection {
  title: string;
  description: string;
  icon: string;
  status: string;
  items: string[];
}

export interface AuditLogRow {
  actor: string;
  action: string;
  target: string;
  category: string;
  time: string;
  ip: string;
  tone: AdminTone;
}

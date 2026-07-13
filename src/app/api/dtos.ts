export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  refreshToken?: string;
  expiresAt?: string;
  userId?: string;
  email?: string;
  fullName?: string;
  role?: string;
  roles?: string[];
}

export interface RoleDto {
  id: number | string;
  name: string;
  code?: string;
  description?: string;
  isSystemRole?: boolean;
  userCount?: number;
  permissionCount?: number;
}

export interface DepartmentDto {
  id: number | string;
  name: string;
  ownerName?: string;
  isActive?: boolean;
  userCount?: number;
  engineerCount?: number;
  categoryCount?: number;
  slaPolicyName?: string;
}

export interface TicketStatusDto {
  id: number | string;
  name: string;
  code?: string;
}

export interface TicketPriorityDto {
  id: number | string;
  name: string;
  code?: string;
  sortOrder?: number;
}

export interface TicketCategoryDto {
  id: number | string;
  name: string;
}

export interface TicketDto {
  id: number | string;
  ticketNumber?: string;
  title: string;
  description?: string;
  requesterName?: string;
  assigneeName?: string | null;
  departmentName?: string;
  statusName?: string;
  priorityName?: string;
  categoryName?: string;
  createdAt?: string;
  updatedAt?: string;
  firstResponseDueAt?: string;
  resolutionDueAt?: string;
  commentCount?: number;
  attachmentCount?: number;
  unread?: boolean;
}

export interface CommentDto {
  id: number | string;
  ticketId: number | string;
  body: string;
  authorName?: string;
  authorRole?: string;
  isInternal?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AttachmentDto {
  id: number | string;
  ticketId: number | string;
  fileName: string;
  contentType?: string;
  fileSize?: number;
  uploadedByName?: string;
  uploadedAt?: string;
}

export interface PagedTicketResponseDto {
  items: TicketDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages?: number;
}

export interface CreateTicketRequestDto {
  title: string;
  description: string;
  priorityId: number | string;
  categoryId: number | string;
}

export interface AssignTicketRequestDto {
  assignedToUserId: number | string;
}

export interface UpdateTicketStatusRequestDto {
  statusId: number | string;
}

export interface CreateCommentRequestDto {
  body: string;
  isInternal: boolean;
}

// ----- Shared -----

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// ----- User Management (Phase 11) -----

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
  createdOn: string;
}

export interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  roleId: string;
  roleName: string;
  departmentId: string;
  departmentName: string;
  isActive: boolean;
  createdOn: string;
  lastUpdated?: string | null;
  lastLoginAt?: string | null;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  isActive: boolean;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserListQuery {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  roleId?: string;
  departmentId?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

// ----- Audit Logs (Phase 12) -----

export interface AuditLogItem {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityName: string;
  entityId: string;
  oldValue?: string | null;
  newValue?: string | null;
  ipAddress?: string | null;
  createdOn: string;
}

export interface AuditLogQuery {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  userId?: string;
  action?: string;
  entityName?: string;
  fromDate?: string;
  toDate?: string;
}

// ----- Dashboard (Phase 10) -----

export interface DashboardStatsResponse {
  totalTickets: number;
  openTickets: number;
  assignedTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
  criticalTickets: number;
  slaBreaches: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface DashboardChartsResponse {
  ticketsByStatus: ChartPoint[];
  ticketsByPriority: ChartPoint[];
  ticketsByDepartment: ChartPoint[];
  weeklyTrend: ChartPoint[];
  monthlyTrend: ChartPoint[];
}

export interface ActivityResponse {
  activityType: string;
  ticketNumber: string;
  userName: string;
  description: string;
  timestamp: string;
}

export interface RecentTicketResponse {
  ticketNumber: string;
  title: string;
  status: string;
  priority: string;
  requester: string;
  assignee?: string | null;
  createdDate: string;
}

// ----- SLA (Phase 14) -----

export interface SlaTicketResponse {
  ticketId: string;
  ticketNumber: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  resolutionDueAt: string;
  remainingMinutes: number;
  slaStatus: string;
  isOverdue: boolean;
  escalationLevel: number;
}

export interface SlaPerformanceResponse {
  totalEvaluated: number;
  met: number;
  breached: number;
  atRisk: number;
  onTrack: number;
  overdue: number;
  compliancePercent: number;
  windowDays: number;
}

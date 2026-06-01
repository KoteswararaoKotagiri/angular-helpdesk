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
  departmentId?: number | string;
  priorityId?: number | string;
}

export interface AssignTicketRequestDto {
  assigneeId: number | string;
}

export interface UpdateTicketStatusRequestDto {
  statusId: number | string;
}

export interface CreateCommentRequestDto {
  body: string;
  isInternal: boolean;
}

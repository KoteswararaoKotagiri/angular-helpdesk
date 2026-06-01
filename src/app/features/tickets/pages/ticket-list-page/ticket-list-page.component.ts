import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, forkJoin, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MasterApi } from '../../../../api/master.api';
import { TicketApi, TicketQuery } from '../../../../api/ticket.api';
import { DepartmentDto, PagedTicketResponseDto, TicketDto, TicketPriorityDto, TicketStatusDto } from '../../../../api/dtos';
import { BulkActionsComponent } from '../../ui/bulk-actions/bulk-actions.component';
import { EmptyStateComponent } from '../../ui/empty-state/empty-state.component';
import { FilterBarComponent } from '../../ui/filter-bar/filter-bar.component';
import { LoadingStateComponent } from '../../ui/loading-state/loading-state.component';
import { PaginationBarComponent } from '../../ui/pagination-bar/pagination-bar.component';
import { TicketTableComponent } from '../../ui/ticket-table/ticket-table.component';
import { TicketToolbarComponent } from '../../ui/ticket-toolbar/ticket-toolbar.component';
import { TicketFilter, TicketMetric, TicketRowModel } from '../../models/ticket-list.models';

@Component({
  selector: 'app-ticket-list-page',
  standalone: true,
  imports: [CommonModule, BulkActionsComponent, EmptyStateComponent, FilterBarComponent, LoadingStateComponent, PaginationBarComponent, TicketTableComponent, TicketToolbarComponent],
  templateUrl: './ticket-list-page.component.html',
  styleUrl: './ticket-list-page.component.scss'
})
export class TicketListPageComponent {
  private readonly ticketApi = inject(TicketApi);
  private readonly masterApi = inject(MasterApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  isLoading = false;
  showEmptyState = false;
  pageNumber = 1;
  pageSize = 8;
  totalCount = 0;
  totalPages = 1;
  search = '';
  selectedStatusId?: number | string;
  selectedPriorityId?: number | string;
  selectedDepartmentId?: number | string;

  statuses: TicketStatusDto[] = [];
  priorities: TicketPriorityDto[] = [];
  departments: DepartmentDto[] = [];

  metrics: TicketMetric[] = [];

  filters: TicketFilter[] = [];

  tickets: TicketRowModel[] = [];

  constructor() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((search) => {
      this.search = search;
      this.pageNumber = 1;
      this.loadTickets();
    });
    this.loadMasterData();
    this.loadTickets();
  }

  get selectedCount(): number {
    return this.tickets.filter((ticket) => ticket.selected).length;
  }

  get paginationLabel(): string {
    const start = this.totalCount === 0 ? 0 : (this.pageNumber - 1) * this.pageSize + 1;
    const end = Math.min(this.pageNumber * this.pageSize, this.totalCount);
    return `Showing ${start}-${end} of ${this.totalCount} tickets`;
  }

  onSearchChange(search: string): void {
    this.searchSubject.next(search);
  }

  onStatusSelected(status: TicketStatusDto): void {
    this.selectedStatusId = status.id;
    this.pageNumber = 1;
    this.loadTickets();
  }

  onPrioritySelected(priority: TicketPriorityDto): void {
    this.selectedPriorityId = priority.id;
    this.pageNumber = 1;
    this.loadTickets();
  }

  onDepartmentSelected(department: DepartmentDto): void {
    this.selectedDepartmentId = department.id;
    this.pageNumber = 1;
    this.loadTickets();
  }

  resetFilters(): void {
    this.selectedStatusId = undefined;
    this.selectedPriorityId = undefined;
    this.selectedDepartmentId = undefined;
    this.search = '';
    this.pageNumber = 1;
    this.loadTickets();
  }

  changePage(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadTickets();
  }

  refresh(): void {
    this.loadTickets();
  }

  private loadMasterData(): void {
    forkJoin({
      statuses: this.masterApi.getTicketStatuses(),
      priorities: this.masterApi.getTicketPriorities(),
      departments: this.masterApi.getDepartments()
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ statuses, priorities, departments }) => {
        this.statuses = statuses;
        this.priorities = priorities;
        this.departments = departments;
        this.filters = [
          { label: 'All', value: 'all', active: true, count: this.totalCount },
          ...statuses.map((status): TicketFilter => ({ label: status.name, value: String(status.id), tone: this.statusTone(status.name) }))
        ];
      });
  }

  private loadTickets(): void {
    this.isLoading = true;
    const query: TicketQuery = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search,
      statusId: this.selectedStatusId,
      priorityId: this.selectedPriorityId,
      departmentId: this.selectedDepartmentId
    };

    this.ticketApi
      .getTickets(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => this.applyTicketResponse(response),
        error: () => {
          this.tickets = [];
          this.showEmptyState = true;
          this.isLoading = false;
        }
      });
  }

  private applyTicketResponse(response: PagedTicketResponseDto): void {
    this.totalCount = response.totalCount;
    this.pageNumber = response.pageNumber;
    this.pageSize = response.pageSize;
    this.totalPages = response.totalPages ?? Math.max(1, Math.ceil(response.totalCount / response.pageSize));
    this.tickets = response.items.map((ticket) => this.mapTicket(ticket));
    this.showEmptyState = this.tickets.length === 0;
    this.metrics = [
      { label: 'Total', value: String(response.totalCount), tone: 'blue' },
      { label: 'Open', value: String(response.items.filter((ticket) => (ticket.statusName ?? '').toLowerCase().includes('open')).length), tone: 'blue' },
      { label: 'Unassigned', value: String(response.items.filter((ticket) => !ticket.assigneeName).length), tone: 'amber' },
      { label: 'Critical', value: String(response.items.filter((ticket) => (ticket.priorityName ?? '').toLowerCase().includes('critical')).length), tone: 'red' }
    ];
    this.filters = this.filters.map((filter) => (filter.value === 'all' ? { ...filter, count: response.totalCount } : filter));
    this.isLoading = false;
  }

  private mapTicket(ticket: TicketDto): TicketRowModel {
    const assignee = ticket.assigneeName ?? 'Unassigned';
    return {
      id: `#${ticket.ticketNumber ?? ticket.id}`,
      title: ticket.title,
      summary: ticket.description ?? '',
      requester: ticket.requesterName ?? 'Requester',
      assignee,
      assigneeInitials: initials(assignee),
      department: ticket.departmentName ?? 'Unassigned',
      status: ticket.statusName ?? 'Open',
      statusTone: this.statusTone(ticket.statusName),
      priority: ticket.priorityName ?? 'Medium',
      priorityTone: this.priorityTone(ticket.priorityName),
      slaLabel: ticket.resolutionDueAt ? formatDate(ticket.resolutionDueAt) : 'No SLA',
      slaPercent: 0,
      slaTone: 'neutral',
      created: formatDate(ticket.createdAt),
      updated: formatDate(ticket.updatedAt),
      comments: ticket.commentCount ?? 0,
      attachments: ticket.attachmentCount ?? 0,
      activity: ticket.unread ? 'active' : 'quiet',
      unread: ticket.unread
    };
  }

  private statusTone(status = ''): TicketRowModel['statusTone'] {
    const normalized = status.toLowerCase();
    if (normalized.includes('resolved') || normalized.includes('closed')) return 'green';
    if (normalized.includes('progress')) return 'amber';
    if (normalized.includes('hold')) return 'purple';
    return 'blue';
  }

  private priorityTone(priority = ''): TicketRowModel['priorityTone'] {
    const normalized = priority.toLowerCase();
    if (normalized.includes('critical')) return 'red';
    if (normalized.includes('high')) return 'amber';
    if (normalized.includes('low')) return 'green';
    return 'blue';
  }
}

function initials(name: string): string {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'UA';
}

function formatDate(value?: string): string {
  return value ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Unknown';
}

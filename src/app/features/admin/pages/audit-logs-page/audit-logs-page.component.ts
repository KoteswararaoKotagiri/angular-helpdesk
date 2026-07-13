import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { AuditLogApi } from '../../../../api/auditlog.api';
import { UserApi } from '../../../../api/user.api';
import { AuditLogItem, UserListItem } from '../../../../api/dtos';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-audit-logs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './audit-logs-page.component.html',
  styleUrl: './audit-logs-page.component.scss'
})
export class AuditLogsPageComponent {
  private readonly auditApi = inject(AuditLogApi);
  private readonly userApi = inject(UserApi);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  logs: AuditLogItem[] = [];
  users: UserListItem[] = [];
  readonly entityOptions = ['Ticket', 'User', 'Role', 'Department'];

  totalCount = 0;
  pageNumber = 1;
  pageSize = 20;

  search = '';
  userId?: string;
  action = '';
  entityName?: string;
  fromDate = '';
  toDate = '';

  isLoading = false;
  error: string | null = null;

  private readonly expanded = new Set<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.search = value;
        this.pageNumber = 1;
        this.load();
      });

    this.userApi
      .getUsers({ pageSize: 100 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => (this.users = result.items));

    this.load();
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  applyFilters(): void {
    this.pageNumber = 1;
    this.load();
  }

  onPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.load();
  }

  toggle(id: string): void {
    if (this.expanded.has(id)) {
      this.expanded.delete(id);
    } else {
      this.expanded.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  actionTone(action: string): string {
    const value = action.toLowerCase();
    if (value.includes('delete') || value.includes('deactivate') || value.includes('breach')) return 'red';
    if (value.includes('create') || value.includes('add')) return 'green';
    if (value.includes('assign') || value.includes('status') || value.includes('update')) return 'blue';
    if (value.includes('login') || value.includes('password')) return 'purple';
    return 'neutral';
  }

  private load(): void {
    this.isLoading = true;
    this.error = null;

    this.auditApi
      .getAuditLogs({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search: this.search || undefined,
        userId: this.userId,
        action: this.action || undefined,
        entityName: this.entityName,
        fromDate: this.fromDate ? `${this.fromDate}T00:00:00` : undefined,
        toDate: this.toDate ? `${this.toDate}T23:59:59` : undefined
      })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.logs = result.items;
          this.totalCount = result.totalCount;
        },
        error: (e: unknown) => {
          this.logs = [];
          this.error = this.errorHandler.userMessage(e);
        }
      });
  }
}

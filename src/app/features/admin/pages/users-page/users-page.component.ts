import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { MasterApi } from '../../../../api/master.api';
import { UserApi } from '../../../../api/user.api';
import { DepartmentDto, RoleDto, UserListItem } from '../../../../api/dtos';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserEditDialogComponent } from './user-edit-dialog.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  private readonly userApi = inject(UserApi);
  private readonly masterApi = inject(MasterApi);
  private readonly dialog = inject(MatDialog);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  users: UserListItem[] = [];
  roles: RoleDto[] = [];
  departments: DepartmentDto[] = [];

  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;

  search = '';
  roleId?: string;
  departmentId?: string;
  activeFilter: 'all' | 'active' | 'inactive' = 'all';
  sortBy: 'name' | 'createdDate' = 'createdDate';
  sortDescending = true;

  isLoading = false;
  error: string | null = null;

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.search = value;
        this.pageNumber = 1;
        this.loadUsers();
      });

    this.masterApi.getRoles().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((roles) => (this.roles = roles));
    this.masterApi.getDepartments().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((departments) => (this.departments = departments));
    this.loadUsers();
  }

  onSearch(value: string): void {
    this.searchSubject.next(value);
  }

  applyFilters(): void {
    this.pageNumber = 1;
    this.loadUsers();
  }

  onPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  toggleSort(): void {
    this.sortDescending = !this.sortDescending;
    this.loadUsers();
  }

  edit(user: UserListItem): void {
    this.dialog
      .open(UserEditDialogComponent, { data: { userId: user.id }, width: '420px' })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.loadUsers();
        }
      });
  }

  toggleActive(user: UserListItem): void {
    const deactivating = user.isActive;
    const data: ConfirmDialogData = deactivating
      ? { title: 'Deactivate user', message: `Deactivate ${user.fullName}? They will no longer be active.`, confirmLabel: 'Deactivate', tone: 'warn' }
      : { title: 'Activate user', message: `Reactivate ${user.fullName}?`, confirmLabel: 'Activate' };

    this.dialog
      .open(ConfirmDialogComponent, { data, width: '380px' })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }
        const done = { next: () => this.loadUsers(), error: (e: unknown) => (this.error = this.errorHandler.userMessage(e)) };
        if (deactivating) {
          this.userApi.deactivateUser(user.id).subscribe(done);
          return;
        }
        // Reactivate: load the full record, then update with isActive = true.
        this.userApi.getUser(user.id).subscribe({
          next: (detail) =>
            this.userApi
              .updateUser(user.id, {
                firstName: detail.firstName,
                lastName: detail.lastName,
                email: detail.email,
                departmentId: detail.departmentId,
                isActive: true
              })
              .subscribe(done),
          error: done.error
        });
      });
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.error = null;

    this.userApi
      .getUsers({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search: this.search || undefined,
        roleId: this.roleId,
        departmentId: this.departmentId,
        isActive: this.activeFilter === 'all' ? undefined : this.activeFilter === 'active',
        sortBy: this.sortBy,
        sortDescending: this.sortDescending
      })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.users = result.items;
          this.totalCount = result.totalCount;
        },
        error: (e: unknown) => {
          this.users = [];
          this.error = this.errorHandler.userMessage(e);
        }
      });
  }

  initials(name: string): string {
    return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() || 'U';
  }
}

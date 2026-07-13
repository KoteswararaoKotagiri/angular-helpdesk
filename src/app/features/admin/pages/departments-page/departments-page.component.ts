import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { MasterApi } from '../../../../api/master.api';
import { UserApi } from '../../../../api/user.api';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';

interface DepartmentView {
  id: string;
  name: string;
  userCount: number;
}

@Component({
  selector: 'app-departments-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './departments-page.component.html',
  styleUrl: './departments-page.component.scss'
})
export class DepartmentsPageComponent {
  private readonly masterApi = inject(MasterApi);
  private readonly userApi = inject(UserApi);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);

  departments: DepartmentView[] = [];
  isLoading = true;
  error: string | null = null;

  constructor() {
    this.masterApi
      .getDepartments()
      .pipe(
        switchMap((departments) => {
          if (departments.length === 0) {
            return of<DepartmentView[]>([]);
          }
          return forkJoin(
            departments.map((department) =>
              this.userApi.getUsers({ departmentId: String(department.id), pageSize: 1 }).pipe(
                map((result) => ({ id: String(department.id), name: department.name, userCount: result.totalCount })),
                catchError(() => of({ id: String(department.id), name: department.name, userCount: 0 }))
              )
            )
          );
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (departments) => (this.departments = departments),
        error: (e: unknown) => (this.error = this.errorHandler.userMessage(e))
      });
  }
}

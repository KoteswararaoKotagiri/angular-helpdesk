import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { MasterApi } from '../../../../api/master.api';
import { UserApi } from '../../../../api/user.api';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';

interface RoleView {
  id: string;
  name: string;
  code: string;
  userCount: number;
}

@Component({
  selector: 'app-roles-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.scss'
})
export class RolesPageComponent {
  private readonly masterApi = inject(MasterApi);
  private readonly userApi = inject(UserApi);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);

  roles: RoleView[] = [];
  isLoading = true;
  error: string | null = null;

  constructor() {
    this.masterApi
      .getRoles()
      .pipe(
        switchMap((roles) => {
          if (roles.length === 0) {
            return of<RoleView[]>([]);
          }
          return forkJoin(
            roles.map((role) =>
              this.userApi.getUsers({ roleId: String(role.id), pageSize: 1 }).pipe(
                map((result) => ({ id: String(role.id), name: role.name, code: role.code ?? '', userCount: result.totalCount })),
                catchError(() => of({ id: String(role.id), name: role.name, code: role.code ?? '', userCount: 0 }))
              )
            )
          );
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (roles) => (this.roles = roles),
        error: (e: unknown) => (this.error = this.errorHandler.userMessage(e))
      });
  }
}

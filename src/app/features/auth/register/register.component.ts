import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthApi } from '../../../api/auth.api';
import { MasterApi } from '../../../api/master.api';
import { DepartmentDto, RoleDto } from '../../../api/dtos';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <form class="register" (ngSubmit)="submit()" #form="ngForm">
      <h1>Create account</h1>

      <mat-form-field appearance="outline">
        <mat-label>First name</mat-label>
        <input matInput name="firstName" [(ngModel)]="firstName" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Last name</mat-label>
        <input matInput name="lastName" [(ngModel)]="lastName" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" name="email" [(ngModel)]="email" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input matInput type="password" name="password" [(ngModel)]="password" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Role</mat-label>
        <mat-select name="roleId" [(ngModel)]="roleId" required>
          <mat-option *ngFor="let role of roles" [value]="role.id">{{ role.name }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Department</mat-label>
        <mat-select name="departmentId" [(ngModel)]="departmentId" required>
          <mat-option *ngFor="let department of departments" [value]="department.id">{{ department.name }}</mat-option>
        </mat-select>
      </mat-form-field>

      <p class="register__error" *ngIf="errorMessage">{{ errorMessage }}</p>
      <p class="register__success" *ngIf="successMessage">{{ successMessage }}</p>

      <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting">
        {{ isSubmitting ? 'Creating…' : 'Register' }}
      </button>

      <a mat-button routerLink="/auth/login">Back to login</a>
    </form>
  `,
  styles: [
    `.register { display: flex; flex-direction: column; gap: 12px; max-width: 360px; margin: 48px auto; }`
  ]
})
export class RegisterComponent {
  private readonly authApi = inject(AuthApi);
  private readonly masterApi = inject(MasterApi);
  private readonly router = inject(Router);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  roleId?: string | number;
  departmentId?: string | number;

  roles: RoleDto[] = [];
  departments: DepartmentDto[] = [];
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.masterApi.getRoles().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((roles) => (this.roles = roles));
    this.masterApi.getDepartments().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((departments) => (this.departments = departments));
  }

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    this.authApi
      .register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        roleId: this.roleId,
        departmentId: this.departmentId
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isSubmitting = false))
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Account created. Redirecting to login…';
          setTimeout(() => void this.router.navigateByUrl('/auth/login'), 1200);
        },
        error: (error: unknown) => (this.errorMessage = this.errorHandler.userMessage(error))
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';
import { MasterApi } from '../../../../api/master.api';
import { UserApi } from '../../../../api/user.api';
import { DepartmentDto, RoleDto, UserDetail } from '../../../../api/dtos';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  template: `
    <h2 mat-dialog-title>Edit user</h2>
    <mat-dialog-content>
      <div class="loading" *ngIf="isLoading"><mat-spinner [diameter]="28"></mat-spinner></div>

      <form *ngIf="!isLoading && user" class="form" (ngSubmit)="save()" #form="ngForm">
        <mat-form-field appearance="outline">
          <mat-label>First name</mat-label>
          <input matInput name="firstName" [(ngModel)]="user.firstName" required />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Last name</mat-label>
          <input matInput name="lastName" [(ngModel)]="user.lastName" required />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" name="email" [(ngModel)]="user.email" required email />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Role</mat-label>
          <mat-select name="roleId" [(ngModel)]="user.roleId" required>
            <mat-option *ngFor="let role of roles" [value]="role.id">{{ role.name }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Department</mat-label>
          <mat-select name="departmentId" [(ngModel)]="user.departmentId" required>
            <mat-option *ngFor="let dept of departments" [value]="dept.id">{{ dept.name }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-slide-toggle name="isActive" [(ngModel)]="user.isActive">Active</mat-slide-toggle>

        <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" [mat-dialog-close]="false">Cancel</button>
      <button mat-flat-button color="primary" type="button" (click)="save()" [disabled]="isLoading || isSaving">
        {{ isSaving ? 'Saving…' : 'Save changes' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `.form { display: flex; flex-direction: column; gap: 10px; min-width: 320px; }
     .loading { display: flex; justify-content: center; padding: 24px; }
     .error { color: var(--red, #d33); margin: 0; }`
  ]
})
export class UserEditDialogComponent implements OnInit {
  private readonly userApi = inject(UserApi);
  private readonly masterApi = inject(MasterApi);
  private readonly errorHandler = inject(ErrorHandlerService);

  user?: UserDetail;
  private originalRoleId = '';
  private originalDepartmentId = '';
  roles: RoleDto[] = [];
  departments: DepartmentDto[] = [];
  isLoading = true;
  isSaving = false;
  errorMessage = '';

  constructor(
    public readonly dialogRef: MatDialogRef<UserEditDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) private readonly data: { userId: string }
  ) {}

  ngOnInit(): void {
    forkJoin({
      user: this.userApi.getUser(this.data.userId),
      roles: this.masterApi.getRoles(),
      departments: this.masterApi.getDepartments()
    }).subscribe({
      next: ({ user, roles, departments }) => {
        this.user = user;
        this.originalRoleId = user.roleId;
        this.originalDepartmentId = user.departmentId;
        this.roles = roles;
        this.departments = departments;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = this.errorHandler.userMessage(error);
        this.isLoading = false;
      }
    });
  }

  save(): void {
    if (!this.user) {
      return;
    }
    this.isSaving = true;
    this.errorMessage = '';

    const id = this.user.id;
    const roleChanged = this.user.roleId !== this.originalRoleId;

    this.userApi
      .updateUser(id, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        departmentId: this.user.departmentId,
        isActive: this.user.isActive
      })
      .subscribe({
        next: () => {
          if (roleChanged) {
            this.userApi.changeRole(id, this.user!.roleId).subscribe({
              next: () => this.dialogRef.close(true),
              error: (error: unknown) => this.fail(error)
            });
          } else {
            this.dialogRef.close(true);
          }
        },
        error: (error: unknown) => this.fail(error)
      });
  }

  private fail(error: unknown): void {
    this.isSaving = false;
    this.errorMessage = this.errorHandler.userMessage(error);
  }
}

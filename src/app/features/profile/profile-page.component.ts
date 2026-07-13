import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { UserApi } from '../../api/user.api';
import { UserDetail } from '../../api/dtos';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  private readonly userApi = inject(UserApi);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroyRef = inject(DestroyRef);

  profile?: UserDetail;
  isLoading = true;
  loadError: string | null = null;

  // Profile form
  savingProfile = false;
  profileMessage = '';
  profileError = '';

  // Password form
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  savingPassword = false;
  passwordMessage = '';
  passwordError = '';

  ngOnInit(): void {
    this.userApi
      .getProfile()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (profile) => (this.profile = profile),
        error: (e: unknown) => (this.loadError = this.errorHandler.userMessage(e))
      });
  }

  saveProfile(): void {
    if (!this.profile) {
      return;
    }
    this.savingProfile = true;
    this.profileMessage = '';
    this.profileError = '';

    this.userApi
      .updateProfile({ firstName: this.profile.firstName, lastName: this.profile.lastName, email: this.profile.email })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.savingProfile = false)))
      .subscribe({
        next: (updated) => {
          this.profile = updated;
          this.profileMessage = 'Profile updated.';
        },
        error: (e: unknown) => (this.profileError = this.errorHandler.userMessage(e))
      });
  }

  changePassword(): void {
    this.savingPassword = true;
    this.passwordMessage = '';
    this.passwordError = '';

    this.userApi
      .changePassword({ currentPassword: this.currentPassword, newPassword: this.newPassword, confirmPassword: this.confirmPassword })
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.savingPassword = false)))
      .subscribe({
        next: () => {
          this.passwordMessage = 'Password changed successfully.';
          this.currentPassword = this.newPassword = this.confirmPassword = '';
        },
        error: (e: unknown) => (this.passwordError = this.errorHandler.userMessage(e))
      });
  }
}

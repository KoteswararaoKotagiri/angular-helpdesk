import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const SHARED_IMPORTS = [CommonModule, ReactiveFormsModule, RouterModule] as const;

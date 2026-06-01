import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PermissionGroup } from '../../models/admin.models';

@Component({
  selector: 'app-admin-permission-matrix',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './permission-matrix.component.html',
  styleUrl: './permission-matrix.component.scss'
})
export class PermissionMatrixComponent {
  @Input() groups: PermissionGroup[] = [];
}

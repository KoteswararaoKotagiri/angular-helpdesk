import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminMetric } from '../../models/admin.models';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {
  @Input() title = '';
  @Input() eyebrow = 'Administration';
  @Input() subtitle = '';
  @Input() metrics: AdminMetric[] = [];
  @Input() primaryAction = '';
  @Input() secondaryAction = '';
}

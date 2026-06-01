import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfigurationItem } from '../../models/admin.models';

@Component({
  selector: 'app-admin-configuration-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './configuration-card.component.html',
  styleUrl: './configuration-card.component.scss'
})
export class ConfigurationCardComponent {
  @Input() item!: ConfigurationItem;
}

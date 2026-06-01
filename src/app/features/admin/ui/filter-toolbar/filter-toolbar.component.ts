import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterOption } from '../../models/admin.models';

@Component({
  selector: 'app-admin-filter-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatTooltipModule],
  templateUrl: './filter-toolbar.component.html',
  styleUrl: './filter-toolbar.component.scss'
})
export class FilterToolbarComponent {
  @Input() placeholder = 'Search';
  @Input() filters: FilterOption[] = [];
  @Input() resultLabel = '';
}

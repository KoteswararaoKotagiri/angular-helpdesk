import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface QuickAction {
  icon: string;
  label: string;
  tone: 'primary' | 'neutral' | 'warn';
}

@Component({
  selector: 'app-quick-actions-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './quick-actions-panel.component.html',
  styleUrl: './quick-actions-panel.component.scss'
})
export class QuickActionsPanelComponent {
  readonly actions: QuickAction[] = [
    { icon: 'person_add', label: 'Assign', tone: 'primary' },
    { icon: 'sync_alt', label: 'Move status', tone: 'neutral' },
    { icon: 'sticky_note_2', label: 'Add note', tone: 'neutral' },
    { icon: 'priority_high', label: 'Escalate', tone: 'warn' },
    { icon: 'check_circle', label: 'Close', tone: 'neutral' }
  ];
}

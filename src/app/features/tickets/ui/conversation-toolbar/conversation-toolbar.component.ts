import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RealtimeBadgeComponent } from '../realtime-badge/realtime-badge.component';

@Component({
  selector: 'app-conversation-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, RealtimeBadgeComponent],
  templateUrl: './conversation-toolbar.component.html',
  styleUrl: './conversation-toolbar.component.scss'
})
export class ConversationToolbarComponent {
  @Input() count = 0;
  @Input() participants = 0;
}

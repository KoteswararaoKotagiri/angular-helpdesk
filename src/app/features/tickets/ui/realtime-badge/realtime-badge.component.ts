import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-realtime-badge',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './realtime-badge.component.html',
  styleUrl: './realtime-badge.component.scss'
})
export class RealtimeBadgeComponent {
  @Input() label = 'Live';
  @Input() detail = 'Realtime ready';
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-realtime-indicator',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './realtime-indicator.component.html',
  styleUrl: './realtime-indicator.component.scss'
})
export class RealtimeIndicatorComponent {
  @Input() label = 'Live workspace';
  @Input() detail = '3 teammates active';
  @Input() active = true;
}

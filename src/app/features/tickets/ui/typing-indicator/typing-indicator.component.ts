import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-indicator',
  standalone: true,
  templateUrl: './typing-indicator.component.html',
  styleUrl: './typing-indicator.component.scss'
})
export class TypingIndicatorComponent {
  @Input() names = 'Priya and Vijay';
}

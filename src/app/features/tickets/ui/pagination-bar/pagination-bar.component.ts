import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  @Input() label = 'Showing 1-8 of 47 tickets';
}

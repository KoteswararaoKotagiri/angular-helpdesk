import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './pagination-bar.component.html',
  styleUrl: './pagination-bar.component.scss'
})
export class PaginationBarComponent {
  @Input() label = 'Showing 1-8 of 47 tickets';
  @Input() pageNumber = 1;
  @Input() totalPages = 1;
  @Output() pageChanged = new EventEmitter<number>();

  previous(): void {
    if (this.pageNumber > 1) {
      this.pageChanged.emit(this.pageNumber - 1);
    }
  }

  next(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageChanged.emit(this.pageNumber + 1);
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-zone',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-zone.component.html',
  styleUrl: './upload-zone.component.scss'
})
export class UploadZoneComponent {
  @Output() fileSelected = new EventEmitter<File>();

  chooseFile(input: HTMLInputElement): void {
    input.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);
    if (file) {
      this.fileSelected.emit(file);
      input.value = '';
    }
  }
}

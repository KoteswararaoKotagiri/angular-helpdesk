import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-zone',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-zone.component.html',
  styleUrl: './upload-zone.component.scss'
})
export class UploadZoneComponent {}

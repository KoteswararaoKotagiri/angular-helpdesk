import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UploadZoneComponent } from '../upload-zone/upload-zone.component';

@Component({
  selector: 'app-message-composer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatMenuModule, MatTooltipModule, UploadZoneComponent],
  templateUrl: './message-composer.component.html',
  styleUrl: './message-composer.component.scss'
})
export class MessageComposerComponent {
  @Output() submitted = new EventEmitter<{ body: string; isInternal: boolean }>();
  mode: 'reply' | 'note' = 'reply';
  draft = '';
  readonly suggestedMentions = ['@Anita', '@Vijay', '@Priya'];

  submit(): void {
    const body = this.draft.trim();
    if (!body) {
      return;
    }

    this.submitted.emit({ body, isInternal: this.mode === 'note' });
    this.draft = '';
  }
}

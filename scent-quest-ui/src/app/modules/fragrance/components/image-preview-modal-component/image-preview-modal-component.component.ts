import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'image-preview-modal',
  template: `
    <div class="modal">
      <div class="modal-content">
        <img [src]="imageSrc" alt="Selected Image">
        <div class="button-container">
          <button (click)="confirm()">Confirm</button>
          <button (click)="cancel()">Cancel</button>
        </div>
      </div>
    </div>
  `
})
export class ImagePreviewModalComponent {
  @Input() imageSrc: string | null = '';
  @Output() confirmSelection = new EventEmitter<boolean>();

  confirm() {
    this.confirmSelection.emit(true);
  }

  cancel() {
    this.confirmSelection.emit(false);
  }
}

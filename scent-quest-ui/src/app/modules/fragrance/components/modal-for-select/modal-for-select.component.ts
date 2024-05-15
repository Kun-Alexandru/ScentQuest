import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-for-select',
  templateUrl: './modal-for-select.component.html',
  styleUrl: './modal-for-select.component.scss'
})
export class ModalForSelectComponent {
  @Input() imageSrc: string | null = '';
  @Output() confirmSelection = new EventEmitter<boolean>();

  confirm() {
    this.confirmSelection.emit(true);
  }

  cancel() {
    this.confirmSelection.emit(false);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogPhotoComponent } from './confirmation-dialog-photo.component';

describe('ConfirmationDialogPhotoComponent', () => {
  let component: ConfirmationDialogPhotoComponent;
  let fixture: ComponentFixture<ConfirmationDialogPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogPhotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationDialogPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

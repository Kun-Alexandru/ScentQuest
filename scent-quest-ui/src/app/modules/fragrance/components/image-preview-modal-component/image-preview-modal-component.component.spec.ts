import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewModalComponentComponent } from './image-preview-modal-component.component';

describe('ImagePreviewModalComponentComponent', () => {
  let component: ImagePreviewModalComponentComponent;
  let fixture: ComponentFixture<ImagePreviewModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagePreviewModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagePreviewModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

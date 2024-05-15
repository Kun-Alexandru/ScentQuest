import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForSelectComponent } from './modal-for-select.component';

describe('ModalForSelectComponent', () => {
  let component: ModalForSelectComponent;
  let fixture: ComponentFixture<ModalForSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalForSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalForSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFragranceComponent } from './manage-fragrance.component';

describe('ManageFragranceComponent', () => {
  let component: ManageFragranceComponent;
  let fixture: ComponentFixture<ManageFragranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFragranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFragranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

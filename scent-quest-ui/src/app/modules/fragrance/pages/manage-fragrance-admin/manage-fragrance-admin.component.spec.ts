import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFragranceAdminComponent } from './manage-fragrance-admin.component';

describe('ManageFragranceAdminComponent', () => {
  let component: ManageFragranceAdminComponent;
  let fixture: ComponentFixture<ManageFragranceAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFragranceAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFragranceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

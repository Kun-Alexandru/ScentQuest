import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoFormComponent } from './update-user-info-form.component';

describe('UpdateUserInfoFormComponent', () => {
  let component: UpdateUserInfoFormComponent;
  let fixture: ComponentFixture<UpdateUserInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateUserInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUserInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

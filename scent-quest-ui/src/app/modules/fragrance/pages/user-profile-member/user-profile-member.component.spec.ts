import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileMemberComponent } from './user-profile-member.component';

describe('UserProfileMemberComponent', () => {
  let component: UserProfileMemberComponent;
  let fixture: ComponentFixture<UserProfileMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfileMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

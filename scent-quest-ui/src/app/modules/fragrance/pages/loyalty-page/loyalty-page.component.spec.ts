import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyPageComponent } from './loyalty-page.component';

describe('LoyaltyPageComponent', () => {
  let component: LoyaltyPageComponent;
  let fixture: ComponentFixture<LoyaltyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoyaltyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoyaltyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

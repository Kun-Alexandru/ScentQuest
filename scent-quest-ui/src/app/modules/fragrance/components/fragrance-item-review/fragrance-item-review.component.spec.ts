import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceItemReviewComponent } from './fragrance-item-review.component';

describe('FragranceItemReviewComponent', () => {
  let component: FragranceItemReviewComponent;
  let fixture: ComponentFixture<FragranceItemReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FragranceItemReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FragranceItemReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

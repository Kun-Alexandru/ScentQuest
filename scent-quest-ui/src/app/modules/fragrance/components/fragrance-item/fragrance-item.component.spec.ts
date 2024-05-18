import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceItemComponent } from './fragrance-item.component';

describe('FragranceItemComponent', () => {
  let component: FragranceItemComponent;
  let fixture: ComponentFixture<FragranceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FragranceItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FragranceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

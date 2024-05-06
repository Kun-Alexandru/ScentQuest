import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragrancePageComponent } from './fragrance-page.component';

describe('FragrancePageComponent', () => {
  let component: FragrancePageComponent;
  let fixture: ComponentFixture<FragrancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FragrancePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FragrancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

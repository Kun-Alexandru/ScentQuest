import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceFinderComponent } from './fragrance-finder.component';

describe('FragranceFinderComponent', () => {
  let component: FragranceFinderComponent;
  let fixture: ComponentFixture<FragranceFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FragranceFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FragranceFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

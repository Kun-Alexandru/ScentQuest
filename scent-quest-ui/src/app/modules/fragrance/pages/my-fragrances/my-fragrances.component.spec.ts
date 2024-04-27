import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFragrancesComponent } from './my-fragrances.component';

describe('MyFragrancesComponent', () => {
  let component: MyFragrancesComponent;
  let fixture: ComponentFixture<MyFragrancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFragrancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFragrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnedListComponent } from './my-owned-list.component';

describe('MyOwnedListComponent', () => {
  let component: MyOwnedListComponent;
  let fixture: ComponentFixture<MyOwnedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyOwnedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyOwnedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

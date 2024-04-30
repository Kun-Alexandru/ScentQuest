import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoriteListComponent } from './my-favorite-list.component';

describe('MyFavoriteListComponent', () => {
  let component: MyFavoriteListComponent;
  let fixture: ComponentFixture<MyFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFavoriteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

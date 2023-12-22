import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritemovieComponent } from './favoritemovie.component';

describe('FavoritemovieComponent', () => {
  let component: FavoritemovieComponent;
  let fixture: ComponentFixture<FavoritemovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritemovieComponent]
    });
    fixture = TestBed.createComponent(FavoritemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

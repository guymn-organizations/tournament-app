import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderPlayerComponent } from './finder-player.component';

describe('FinderPlayerComponent', () => {
  let component: FinderPlayerComponent;
  let fixture: ComponentFixture<FinderPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinderPlayerComponent]
    });
    fixture = TestBed.createComponent(FinderPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

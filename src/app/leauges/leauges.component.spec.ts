import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaugesComponent } from './leauges.component';

describe('LeaugesComponent', () => {
  let component: LeaugesComponent;
  let fixture: ComponentFixture<LeaugesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaugesComponent]
    });
    fixture = TestBed.createComponent(LeaugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

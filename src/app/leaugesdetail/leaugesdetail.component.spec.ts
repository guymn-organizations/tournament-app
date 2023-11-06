import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaugesdetailComponent } from './leaugesdetail.component';

describe('LeaugesdetailComponent', () => {
  let component: LeaugesdetailComponent;
  let fixture: ComponentFixture<LeaugesdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaugesdetailComponent]
    });
    fixture = TestBed.createComponent(LeaugesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

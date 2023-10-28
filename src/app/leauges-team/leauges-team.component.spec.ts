import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaugesTeamComponent } from './leauges-team.component';

describe('LeaugesTeamComponent', () => {
  let component: LeaugesTeamComponent;
  let fixture: ComponentFixture<LeaugesTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaugesTeamComponent]
    });
    fixture = TestBed.createComponent(LeaugesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

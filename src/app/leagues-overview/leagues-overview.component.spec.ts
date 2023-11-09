import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesOverviewComponent } from './leagues-overview.component';

describe('LeaguesOverviewComponent', () => {
  let component: LeaguesOverviewComponent;
  let fixture: ComponentFixture<LeaguesOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesOverviewComponent]
    });
    fixture = TestBed.createComponent(LeaguesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

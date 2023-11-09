import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesTeamComponent } from './leagues-team.component';

describe('LeaguesTeamComponent', () => {
  let component: LeaguesTeamComponent;
  let fixture: ComponentFixture<LeaguesTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesTeamComponent]
    });
    fixture = TestBed.createComponent(LeaguesTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

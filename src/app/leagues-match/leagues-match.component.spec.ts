import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesMatchComponent } from './leagues-match.component';

describe('LeaguesMatchComponent', () => {
  let component: LeaguesMatchComponent;
  let fixture: ComponentFixture<LeaguesMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesMatchComponent]
    });
    fixture = TestBed.createComponent(LeaguesMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

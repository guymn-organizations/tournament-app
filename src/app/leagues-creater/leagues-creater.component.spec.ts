import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesCreaterComponent } from './leagues-creater.component';

describe('LeaguesCreaterComponent', () => {
  let component: LeaguesCreaterComponent;
  let fixture: ComponentFixture<LeaguesCreaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesCreaterComponent]
    });
    fixture = TestBed.createComponent(LeaguesCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

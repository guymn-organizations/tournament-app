import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesDetailComponent } from './leagues-detail.component';

describe('LeaguesDetailComponent', () => {
  let component: LeaguesDetailComponent;
  let fixture: ComponentFixture<LeaguesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaguesDetailComponent]
    });
    fixture = TestBed.createComponent(LeaguesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

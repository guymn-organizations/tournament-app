import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeampostDetailComponent } from './teampost-detail.component';

describe('TeampostDetailComponent', () => {
  let component: TeampostDetailComponent;
  let fixture: ComponentFixture<TeampostDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeampostDetailComponent]
    });
    fixture = TestBed.createComponent(TeampostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

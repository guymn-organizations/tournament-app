import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinderTeamComponent } from './finder-team.component';

describe('FinderTeamComponent', () => {
  let component: FinderTeamComponent;
  let fixture: ComponentFixture<FinderTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinderTeamComponent]
    });
    fixture = TestBed.createComponent(FinderTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

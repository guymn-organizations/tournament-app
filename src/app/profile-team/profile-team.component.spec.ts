import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTeamComponent } from './profile-team.component';

describe('ProfileTeamComponent', () => {
  let component: ProfileTeamComponent;
  let fixture: ComponentFixture<ProfileTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTeamComponent]
    });
    fixture = TestBed.createComponent(ProfileTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListScrimComponent } from './profile-list-scrim.component';

describe('ProfileListScrimComponent', () => {
  let component: ProfileListScrimComponent;
  let fixture: ComponentFixture<ProfileListScrimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileListScrimComponent]
    });
    fixture = TestBed.createComponent(ProfileListScrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

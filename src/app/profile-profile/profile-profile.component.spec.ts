import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileProfileComponent } from './profile-profile.component';

describe('ProfileProfileComponent', () => {
  let component: ProfileProfileComponent;
  let fixture: ComponentFixture<ProfileProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileProfileComponent]
    });
    fixture = TestBed.createComponent(ProfileProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

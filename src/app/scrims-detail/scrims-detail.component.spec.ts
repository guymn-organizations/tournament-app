import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrimsDetailComponent } from './scrims-detail.component';

describe('ScrimsDetailComponent', () => {
  let component: ScrimsDetailComponent;
  let fixture: ComponentFixture<ScrimsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrimsDetailComponent]
    });
    fixture = TestBed.createComponent(ScrimsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

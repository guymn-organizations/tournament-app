import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrimsComponent } from './scrims.component';

describe('ScrimsComponent', () => {
  let component: ScrimsComponent;
  let fixture: ComponentFixture<ScrimsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrimsComponent]
    });
    fixture = TestBed.createComponent(ScrimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

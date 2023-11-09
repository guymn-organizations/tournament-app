import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmatchComponent } from './detailmatch.component';

describe('DetailmatchComponent', () => {
  let component: DetailmatchComponent;
  let fixture: ComponentFixture<DetailmatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailmatchComponent]
    });
    fixture = TestBed.createComponent(DetailmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

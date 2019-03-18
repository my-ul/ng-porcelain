import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRefinerComponent } from './date-refiner.component';

describe('DateRefinerComponent', () => {
  let component: DateRefinerComponent;
  let fixture: ComponentFixture<DateRefinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRefinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRefinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

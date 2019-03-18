import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinersComponent } from './refiners.component';

describe('RefinersComponent', () => {
  let component: RefinersComponent;
  let fixture: ComponentFixture<RefinersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefinersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

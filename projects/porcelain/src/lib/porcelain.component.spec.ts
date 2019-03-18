import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcelainComponent } from './porcelain.component';

describe('PorcelainComponent', () => {
  let component: PorcelainComponent;
  let fixture: ComponentFixture<PorcelainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorcelainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorcelainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

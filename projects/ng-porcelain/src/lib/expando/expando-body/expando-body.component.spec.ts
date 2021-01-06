import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandoBodyComponent } from './expando-body.component';

describe('ExpandoBodyComponent', () => {
	let component: ExpandoBodyComponent;
	let fixture: ComponentFixture<ExpandoBodyComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ExpandoBodyComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExpandoBodyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandoHeaderComponent } from './expando-header.component';

describe('ExpandoHeaderComponent', () => {
	let component: ExpandoHeaderComponent;
	let fixture: ComponentFixture<ExpandoHeaderComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ExpandoHeaderComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ExpandoHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

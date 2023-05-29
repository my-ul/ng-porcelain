import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsableRefinerComponent } from './collapsable-refiner.component';

describe('CollapsableRefinerComponent', () => {
	let component: CollapsableRefinerComponent;
	let fixture: ComponentFixture<CollapsableRefinerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CollapsableRefinerComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CollapsableRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

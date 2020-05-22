import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackDocsComponent } from './rack-docs.component';

describe('RackDocsComponent', () => {
	let component: RackDocsComponent;
	let fixture: ComponentFixture<RackDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RackDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RackDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

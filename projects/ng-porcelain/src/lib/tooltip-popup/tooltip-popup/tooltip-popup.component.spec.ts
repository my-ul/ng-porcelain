import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipPopupComponent } from './tooltip-popup.component';

describe('TooltipPopupComponent', () => {
	let component: TooltipPopupComponent;
	let fixture: ComponentFixture<TooltipPopupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipPopupComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TooltipPopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

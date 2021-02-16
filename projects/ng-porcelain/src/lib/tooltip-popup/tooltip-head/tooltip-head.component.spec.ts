import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipHeadComponent } from './tooltip-head.component';

describe('TooltipHeadComponent', () => {
	let component: TooltipHeadComponent;
	let fixture: ComponentFixture<TooltipHeadComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipHeadComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TooltipHeadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

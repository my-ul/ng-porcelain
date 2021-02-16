import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipMsgComponent } from './tooltip-msg.component';

describe('TooltipMsgComponent', () => {
	let component: TooltipMsgComponent;
	let fixture: ComponentFixture<TooltipMsgComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipMsgComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TooltipMsgComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

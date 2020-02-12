import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarOptionComponent } from './toolbar-option.component';

describe('ToolbarOptionComponent', () => {
	let component: ToolbarOptionComponent;
	let fixture: ComponentFixture<ToolbarOptionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToolbarOptionComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

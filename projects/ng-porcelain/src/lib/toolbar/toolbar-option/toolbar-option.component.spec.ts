import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarOptionComponent } from './toolbar-option.component';

describe('ToolbarOptionComponent', () => {
	let component: ToolbarOptionComponent;
	let fixture: ComponentFixture<ToolbarOptionComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ToolbarOptionComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

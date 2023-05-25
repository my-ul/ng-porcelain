import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarSelectComponent } from './toolbar-select.component';

describe('ToolbarSelectComponent', () => {
	let component: ToolbarSelectComponent;
	let fixture: ComponentFixture<ToolbarSelectComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ToolbarSelectComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

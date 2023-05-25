import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarTextComponent } from './toolbar-text.component';

describe('ToolbarTextComponent', () => {
	let component: ToolbarTextComponent;
	let fixture: ComponentFixture<ToolbarTextComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ToolbarTextComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

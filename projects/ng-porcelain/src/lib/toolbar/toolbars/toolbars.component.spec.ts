import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarsComponent } from './toolbars.component';

describe('ToolbarsComponent', () => {
	let component: ToolbarsComponent;
	let fixture: ComponentFixture<ToolbarsComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ToolbarsComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

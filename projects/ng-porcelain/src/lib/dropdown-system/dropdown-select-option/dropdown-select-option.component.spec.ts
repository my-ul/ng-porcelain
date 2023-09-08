import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropdownSelectOptionComponent } from './dropdown-select-option.component';

describe('DropdownSelectOptionComponent', () => {
	let component: DropdownSelectOptionComponent;
	let fixture: ComponentFixture<DropdownSelectOptionComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [DropdownSelectOptionComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownSelectOptionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

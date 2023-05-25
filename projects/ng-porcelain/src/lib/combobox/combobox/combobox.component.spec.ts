import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComboboxComponent } from './combobox.component';

describe('SelectDropdownComponent', () => {
	let component: ComboboxComponent;
	let fixture: ComponentFixture<ComboboxComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ComboboxComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ComboboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

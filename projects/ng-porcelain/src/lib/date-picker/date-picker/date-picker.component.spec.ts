import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { datePickerComponent } from './date-picker.component';

describe('CalenderControlComponent', () => {
	let component: datePickerComponent;
	let fixture: ComponentFixture<datePickerComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [datePickerComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(datePickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

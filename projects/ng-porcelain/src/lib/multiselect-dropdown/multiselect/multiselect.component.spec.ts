import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultiSelectComponent } from './multiselect.component';

describe('SavedsearchModalpopupComponent', () => {
	let component: MultiSelectComponent;
	let fixture: ComponentFixture<MultiSelectComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [MultiSelectComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MultiSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRefinerComponent } from './date-refiner.component';
import { DATE_REFINER_DIRECTIVES, DATE_REFINER_IMPORTS } from '../date-refiner.module';

describe('DateRefinerComponent', () => {
	let component: DateRefinerComponent;
	let fixture: ComponentFixture<DateRefinerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: DATE_REFINER_DIRECTIVES,
			imports: DATE_REFINER_IMPORTS
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DateRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
});

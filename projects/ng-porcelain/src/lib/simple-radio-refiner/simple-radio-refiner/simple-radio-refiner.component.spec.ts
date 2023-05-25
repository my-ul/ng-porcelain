import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleRadioRefinerComponent } from './simple-radio-refiner.component';
import {
	SIMPLE_RADIO_REFINER_DIRECTIVES,
	SIMPLE_RADIO_REFINER_IMPORTS
} from '../simple-radio-refiner.module';

describe('SimpleRadioRefinerComponent', () => {
	let component: SimpleRadioRefinerComponent;
	let fixture: ComponentFixture<SimpleRadioRefinerComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: SIMPLE_RADIO_REFINER_DIRECTIVES,
				imports: SIMPLE_RADIO_REFINER_IMPORTS
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SimpleRadioRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
});

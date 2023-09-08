import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleRefinerComponent } from './simple-refiner.component';
import { SIMPLE_REFINER_DIRECTIVES, SIMPLE_REFINER_IMPORTS } from '../simple-refiner.module';

describe('SimpleRefinerComponent', () => {
	let component: SimpleRefinerComponent;
	let fixture: ComponentFixture<SimpleRefinerComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: SIMPLE_REFINER_DIRECTIVES,
				imports: SIMPLE_REFINER_IMPORTS
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SimpleRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
});

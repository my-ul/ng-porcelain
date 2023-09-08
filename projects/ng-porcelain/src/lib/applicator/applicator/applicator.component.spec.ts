import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApplicatorComponent } from './applicator.component';
import { APPLICATOR_IMPORTS, APPLICATOR_DIRECTIVES } from '../applicator.module';

describe('ApplicatorComponent', () => {
	let component: ApplicatorComponent;
	let fixture: ComponentFixture<ApplicatorComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: APPLICATOR_DIRECTIVES,
				imports: APPLICATOR_IMPORTS
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ApplicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

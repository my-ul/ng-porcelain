import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RackComponent } from './rack.component';

describe('RackComponent', () => {
	let component: RackComponent<any>;
	let fixture: ComponentFixture<RackComponent<any>>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [RackComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(RackComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

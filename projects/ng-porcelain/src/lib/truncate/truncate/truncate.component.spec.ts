import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TruncateComponent } from './truncate.component';

describe('TruncateComponent', () => {
	let component: TruncateComponent;
	let fixture: ComponentFixture<TruncateComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [TruncateComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TruncateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

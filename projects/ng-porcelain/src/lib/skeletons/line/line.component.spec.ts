import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonLineComponent } from './line.component';

describe('LineComponent', () => {
	let component: SkeletonLineComponent;
	let fixture: ComponentFixture<SkeletonLineComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SkeletonLineComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonLineComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

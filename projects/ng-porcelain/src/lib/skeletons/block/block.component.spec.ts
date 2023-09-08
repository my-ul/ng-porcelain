import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonBlockComponent } from './block.component';

describe('BlockComponent', () => {
	let component: SkeletonBlockComponent;
	let fixture: ComponentFixture<SkeletonBlockComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SkeletonBlockComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonBlockComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

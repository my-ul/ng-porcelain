import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonWordComponent } from './word.component';

describe('WordComponent', () => {
	let component: SkeletonWordComponent;
	let fixture: ComponentFixture<SkeletonWordComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SkeletonWordComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonWordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonWordDocsComponent } from './skeleton-word-docs.component';

describe('SkeletonWordDocsComponent', () => {
	let component: SkeletonWordDocsComponent;
	let fixture: ComponentFixture<SkeletonWordDocsComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SkeletonWordDocsComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonWordDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

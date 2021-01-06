import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDocsIndexComponent } from './skeleton-docs-index.component';

describe('SkeletonDocsIndexComponent', () => {
	let component: SkeletonDocsIndexComponent;
	let fixture: ComponentFixture<SkeletonDocsIndexComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonDocsIndexComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonDocsIndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDocsComponent } from './skeleton-docs.component';

describe('SkeletonDocsComponent', () => {
	let component: SkeletonDocsComponent;
	let fixture: ComponentFixture<SkeletonDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkeletonParagraphComponent } from './paragraph.component';

describe('ParagraphComponent', () => {
	let component: SkeletonParagraphComponent;
	let fixture: ComponentFixture<SkeletonParagraphComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SkeletonParagraphComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonParagraphComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

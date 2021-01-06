import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonParagraphComponent } from './paragraph.component';

describe('ParagraphComponent', () => {
	let component: SkeletonParagraphComponent;
	let fixture: ComponentFixture<SkeletonParagraphComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonParagraphComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonParagraphComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

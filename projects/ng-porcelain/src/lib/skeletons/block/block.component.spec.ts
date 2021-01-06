import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBlockComponent } from './block.component';

describe('BlockComponent', () => {
	let component: SkeletonBlockComponent;
	let fixture: ComponentFixture<SkeletonBlockComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonBlockComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonBlockComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

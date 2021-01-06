import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLineComponent } from './line.component';

describe('LineComponent', () => {
	let component: SkeletonLineComponent;
	let fixture: ComponentFixture<SkeletonLineComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SkeletonLineComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SkeletonLineComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

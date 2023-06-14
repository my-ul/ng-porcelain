import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupingRefinerComponent } from './grouping-refiner.component';

describe('GroupingRefinerComponent', () => {
	let component: GroupingRefinerComponent;
	let fixture: ComponentFixture<GroupingRefinerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GroupingRefinerComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GroupingRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderCellComponent } from './list-header-cell.component';

describe('ListHeaderCellComponent', () => {
	let component: ListHeaderCellComponent;
	let fixture: ComponentFixture<ListHeaderCellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ListHeaderCellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListHeaderCellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

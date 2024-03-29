import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListItemCellComponent } from './list-item-cell.component';

describe('ListItemCellComponent', () => {
	let component: ListItemCellComponent;
	let fixture: ComponentFixture<ListItemCellComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ListItemCellComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ListItemCellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

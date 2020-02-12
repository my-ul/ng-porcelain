import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCellComponent } from './toolbar-cell.component';

describe('ToolbarCellComponent', () => {
	let component: ToolbarCellComponent;
	let fixture: ComponentFixture<ToolbarCellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToolbarCellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarCellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSelectComponent } from './toolbar-select.component';

describe('ToolbarSelectComponent', () => {
	let component: ToolbarSelectComponent;
	let fixture: ComponentFixture<ToolbarSelectComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToolbarSelectComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDropdownComponent1 } from './select-dropdown.component';

describe('SelectDropdownComponent', () => {
	let component: SelectDropdownComponent1;
	let fixture: ComponentFixture<SelectDropdownComponent1>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectDropdownComponent1]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectDropdownComponent1);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

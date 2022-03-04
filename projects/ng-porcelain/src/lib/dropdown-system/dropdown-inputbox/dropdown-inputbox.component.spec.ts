import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownInputboxComponent } from './dropdown-inputbox.component';

describe('DropdownInputboxComponent', () => {
	let component: DropdownInputboxComponent;
	let fixture: ComponentFixture<DropdownInputboxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DropdownInputboxComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownInputboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropdownSelectedTemplateComponent } from './dropdown-selected-template.component';

describe('DropdownSelectedTemplateComponent', () => {
	let component: DropdownSelectedTemplateComponent;
	let fixture: ComponentFixture<DropdownSelectedTemplateComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [DropdownSelectedTemplateComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DropdownSelectedTemplateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

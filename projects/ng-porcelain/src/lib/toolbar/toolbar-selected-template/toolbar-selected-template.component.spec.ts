import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSelectedTemplateComponent } from './toolbar-selected-template.component';

describe('ToolbarSelectedTemplateComponent', () => {
	let component: ToolbarSelectedTemplateComponent;
	let fixture: ComponentFixture<ToolbarSelectedTemplateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToolbarSelectedTemplateComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarSelectedTemplateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarTextComponent } from './toolbar-text.component';

describe('ToolbarTextComponent', () => {
	let component: ToolbarTextComponent;
	let fixture: ComponentFixture<ToolbarTextComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToolbarTextComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

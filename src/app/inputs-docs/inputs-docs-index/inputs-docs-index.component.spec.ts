import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsDocsIndexComponent } from './inputs-docs-index.component';

describe('InputsDocsIndexComponent', () => {
	let component: InputsDocsIndexComponent;
	let fixture: ComponentFixture<InputsDocsIndexComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InputsDocsIndexComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputsDocsIndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

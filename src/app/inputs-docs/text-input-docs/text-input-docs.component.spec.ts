import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputDocsComponent } from './text-input-docs.component';

describe('TextInputDocsComponent', () => {
	let component: TextInputDocsComponent;
	let fixture: ComponentFixture<TextInputDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TextInputDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TextInputDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

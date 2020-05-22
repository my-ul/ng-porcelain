import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputDocsComponent } from './password-input-docs.component';

describe('PasswordInputDocsComponent', () => {
	let component: PasswordInputDocsComponent;
	let fixture: ComponentFixture<PasswordInputDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PasswordInputDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PasswordInputDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

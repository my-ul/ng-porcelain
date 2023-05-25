import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasswordInputDocsComponent } from './password-input-docs.component';

describe('PasswordInputDocsComponent', () => {
	let component: PasswordInputDocsComponent;
	let fixture: ComponentFixture<PasswordInputDocsComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [PasswordInputDocsComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PasswordInputDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextHeaderComponent } from './text-header.component';

describe('TextHeaderComponent', () => {
	let component: TextHeaderComponent;
	let fixture: ComponentFixture<TextHeaderComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [TextHeaderComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(TextHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

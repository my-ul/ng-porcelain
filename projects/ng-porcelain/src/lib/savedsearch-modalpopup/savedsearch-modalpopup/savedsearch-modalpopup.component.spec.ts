import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SavedsearchModalpopupComponent } from './savedsearch-modalpopup.component';

describe('SavedsearchModalpopupComponent', () => {
	let component: SavedsearchModalpopupComponent;
	let fixture: ComponentFixture<SavedsearchModalpopupComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SavedsearchModalpopupComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SavedsearchModalpopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

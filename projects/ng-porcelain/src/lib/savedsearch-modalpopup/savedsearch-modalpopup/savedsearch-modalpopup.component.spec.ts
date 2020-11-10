import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedsearchModalpopupComponent } from './savedsearch-modalpopup.component';

describe('SavedsearchModalpopupComponent', () => {
	let component: SavedsearchModalpopupComponent;
	let fixture: ComponentFixture<SavedsearchModalpopupComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SavedsearchModalpopupComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SavedsearchModalpopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRefinerComponent } from './simple-refiner.component';

describe('SimpleRefinerComponent', () => {
	let component: SimpleRefinerComponent;
	let fixture: ComponentFixture<SimpleRefinerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SimpleRefinerComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SimpleRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

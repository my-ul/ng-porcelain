import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchRefinerComponent } from './search-refiner.component';

describe('SearchRefinerComponent', () => {
	let component: SearchRefinerComponent;
	let fixture: ComponentFixture<SearchRefinerComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [SearchRefinerComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchRefinerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

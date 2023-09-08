import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListBodyComponent } from './list-body.component';

describe('ListBodyComponent', () => {
	let component: ListBodyComponent;
	let fixture: ComponentFixture<ListBodyComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ListBodyComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ListBodyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

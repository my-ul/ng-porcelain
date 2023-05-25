import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDocsIndexComponent } from './list-docs-index.component';

describe('ListDocsIndexComponent', () => {
	let component: ListDocsIndexComponent;
	let fixture: ComponentFixture<ListDocsIndexComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [ListDocsIndexComponent]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ListDocsIndexComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

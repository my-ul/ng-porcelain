import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicColumnsDocsComponent } from './dynamic-columns-docs.component';

describe('DynamicColumnsDocsComponent', () => {
	let component: DynamicColumnsDocsComponent;
	let fixture: ComponentFixture<DynamicColumnsDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DynamicColumnsDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicColumnsDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

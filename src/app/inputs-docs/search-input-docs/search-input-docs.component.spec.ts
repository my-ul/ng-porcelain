import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputDocsComponent } from './search-input-docs.component';

describe('SearchInputDocsComponent', () => {
	let component: SearchInputDocsComponent;
	let fixture: ComponentFixture<SearchInputDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SearchInputDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchInputDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

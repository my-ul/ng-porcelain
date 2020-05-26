import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHeaderComponent } from './dynamic-header.component';

describe('DynamicHeaderComponent', () => {
	let component: DynamicHeaderComponent<any>;
	let fixture: ComponentFixture<DynamicHeaderComponent<any>>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DynamicHeaderComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DynamicHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

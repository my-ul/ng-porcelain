import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { SEARCH_INPUT_IMPORTS, SEARCH_INPUT_DIRECTIVES } from '../search-input.module';
import { TranslationService } from '../../services/translation/translation.service';

describe('SearchInputComponent', () => {
	let component: SearchInputComponent;
	let fixture: ComponentFixture<SearchInputComponent>;
	let translationService: TranslationService = new TranslationService();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: SEARCH_INPUT_IMPORTS,
			declarations: SEARCH_INPUT_DIRECTIVES,
			providers: [
				{
					provide: TranslationService,
					useValue: translationService
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('i18n', () => {
		it('should have a default placeholder label', () => {
			expect(component.placeholderLabel).toBeDefined();
		});

		it('should accept new translations', () => {
			translationService.setTranslations({
				label_TypeToSearch: 'tts'
			});
			expect(component.placeholderLabel).toEqual('tts');
		});
	});

	describe('@Input() userValue', () => {
		it('should init to the empty string by default', () => {
			expect(component.userValue).toEqual('');
		});
	});

	describe('submit()', () => {
		it('should allow submit when cleared to empty', () => {
			component.currentValue = 'CURRENT_VALUE';
			expect(component.canSubmit()).toBeTruthy();
			component.submit();
			expect(component.canEmitEmpty).toBeTruthy();
			component.clear();
			expect(component.canSubmit()).toBeTruthy();
			expect(component.currentValue).toBe('');
			component.submit();
			expect(component.canSubmit()).toBeFalsy();
			expect(component.canEmitEmpty).toBeFalsy();
		});
	});

	describe('clear()', () => {
		it('should clear currentValue when called', () => {
			component.currentValue = 'CURRENT_VALUE';
			component.clear();
			expect(component.currentValue).toBe('');
		});

		it('should call empty() and setFocus()', () => {
			spyOn(component, 'empty');
			spyOn(component, 'setFocus');

			component.currentValue = 'CURRENT_VALUE';
			component.clear();

			expect(component.empty).toHaveBeenCalledTimes(1);
			expect(component.setFocus).toHaveBeenCalledTimes(1);
		});

		it('should emit on the emptyHandler ', done => {
			component.currentValue = 'CURRENT_VALUE';

			component.emptyHandler.subscribe(called => {
				expect(called).toEqual('');
				done();
			});

			component.clear();
		});
	});

	describe('isEmpty()', () => {
		it('should return true when value is the empty string', () => {
			component.currentValue = '';
			expect(component.isEmpty()).toBe(true);
		});

		it('should return false when value is not the empty string', () => {
			component.currentValue = 'CURRENT_VALUE';
			expect(component.isEmpty()).toBe(false);
		});
	});

	describe('canSubmit()', () => {
		it('should allow an emit when a value is present', () => {
			component.currentValue = 'CURRENT_VALUE';
			expect(component.canSubmit()).toBeTruthy();
		});
	});
});

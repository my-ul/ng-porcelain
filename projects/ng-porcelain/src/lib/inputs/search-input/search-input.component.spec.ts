import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';

import { TranslationService } from '../../services/translation/translation.service';
import { INPUTS_IMPORTS, INPUTS_COMPONENTS } from '../inputs.module';

describe('SearchInputComponent', () => {
	let component: SearchInputComponent;
	let fixture: ComponentFixture<SearchInputComponent>;
	let translationService: TranslationService = new TranslationService();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: INPUTS_IMPORTS,
			declarations: INPUTS_COMPONENTS,
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
			expect(component.value).toEqual('');
		});
	});

	describe('submit()', () => {
		it('should allow submit when cleared to empty', () => {
			component.value = 'CURRENT_VALUE';
			expect(component.canSubmit()).toBeTruthy();
			component.trySubmit();
			expect(component.canEmitEmpty).toBeTruthy();
			component.tryClear();
			expect(component.canSubmit()).toBeTruthy();
			expect(component.value).toBe('');
			component.trySubmit();
			expect(component.canSubmit()).toBeFalsy();
			expect(component.canEmitEmpty).toBeFalsy();
		});
	});

	describe('clear()', () => {
		it('should clear currentValue when called', () => {
			component.value = 'CURRENT_VALUE';
			component.tryClear();
			expect(component.value).toBe('');
		});

		it('should call empty() and setFocus()', () => {
			spyOn(component, 'clear');
			spyOn(component, 'setFocus');

			component.value = 'CURRENT_VALUE';
			component.tryClear();

			expect(component.clear).toHaveBeenCalledTimes(1);
			expect(component.ensureFocus).toHaveBeenCalledTimes(1);
		});

		it('should emit on the emptyHandler ', done => {
			component.value = 'CURRENT_VALUE';

			component.clear.subscribe(called => {
				expect(called).toEqual('');
				done();
			});

			component.tryClear();
		});
	});

	describe('isEmpty()', () => {
		it('should return true when value is the empty string', () => {
			component.value = '';
			expect(component.isEmpty()).toBe(true);
		});

		it('should return false when value is not the empty string', () => {
			component.value = 'CURRENT_VALUE';
			expect(component.isEmpty()).toBe(false);
		});
	});

	describe('canSubmit()', () => {
		it('should allow an emit when a value is present', () => {
			component.value = 'CURRENT_VALUE';
			expect(component.canSubmit()).toBeTruthy();
		});
	});
});

import { TestBed, inject } from '@angular/core/testing';

import { TranslationService, TranslationMap } from './translation.service';

describe('TranslationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TranslationService]
		});
	});

	it('should be created', inject([TranslationService], (service: TranslationService) => {
		expect(service).toBeTruthy();
	}));

	it('should replay the last translation', done => {
		inject([TranslationService], (translationService: TranslationService) => {
			let subscriptionCounter = jasmine.createSpy('subscriptionCounter');
			let updateCounter = jasmine.createSpy('updateCounter');

			setTimeout(() => {
				subscriptionCounter();
				translationService.getTranslations().subscribe(updateCounter);
			}, 10);

			setTimeout(() => {
				translationService.setTranslations({
					firstCall: 'First Call'
				});
			}, 15);

			setTimeout(() => {
				subscriptionCounter();
				translationService.getTranslations().subscribe(updateCounter);
			}, 20);

			setTimeout(() => {
				translationService.setTranslations({
					secondCall: 'Second Call'
				});
			}, 25);

			setTimeout(() => {
				subscriptionCounter();
				translationService.getTranslations().subscribe(updateCounter);
			}, 30);

			setTimeout(() => {
				translationService.setTranslations({
					thirdCall: 'Third Call'
				});
			}, 35);

			setTimeout(() => {
				expect(subscriptionCounter).toHaveBeenCalledTimes(3);
				expect(updateCounter).toHaveBeenCalledTimes(8);
				done();
			}, 40);
		})();
	});

	it('should provide new translation values', done => {
		inject([TranslationService], (translationService: TranslationService) => {
			let target = {
					applyLabel: 'Apply',
					cancelLabel: 'Cancel',
					resetLabel: 'Reset'
				},
				translationMap: any = {
					label_Apply: 'applyLabel',
					label_Cancel: 'cancelLabel',
					label_Reset: 'resetLabel',
					doesNotExist: 'resetLabel'
				};

			translationService.setTranslations({
				label_Apply: 'APPLY',
				label_Cancel: 'CANCEL',
				label_Reset: 'RESET'
			});

			translationService
				.getTranslations()
				.subscribe(TranslationService.translate<any>(target, translationMap));

			setTimeout(() => {
				expect(target.applyLabel).toEqual('APPLY');
				expect(target.cancelLabel).toEqual('CANCEL');
				expect(target.resetLabel).toEqual('RESET');
				done();
			});
		})();
	});
});

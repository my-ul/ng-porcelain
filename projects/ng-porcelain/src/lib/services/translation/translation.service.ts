import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

export interface TranslationMap {
	[sourceKey: string]: string;
}

export interface Translations {
	[labelKey: string]: string;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	private translationSubject = new ReplaySubject<Translations>(1);
	constructor() {
		console.log('new TranslationService()');
	}

	/**
	 * Set the current translation dictionary.  Causes all subscriptions to update.
	 */
	public setTranslations(translations: Translations): this {
		this.translationSubject.next(translations);
		return this;
	}

	/**
	 * Get the Translations observable.
	 */
	public getTranslations(): Observable<Translations> {
		return this.translationSubject.asObservable();
	}

	/**
	 * Returns a helper function that will loop through translationMap and take new translations
	 * and copy the values to targetObject.  In the example, the translations at label_Apply
	 * will be copied to this['applyLabel'] (essentially this.applyLabel = translations.label_Apply)
	 * @example
	 * 		translationService.getTranslations().subscribe(
	 * 			TranslationService.translate(this, { 'label_Apply': 'applyLabel' })
	 * 		)
	 */
	public static translate(targetObject: any, translationMap: TranslationMap) {
		return function(newTranslations: Translations) {
			for (let sourceKey in translationMap) {
				let destKey = translationMap[sourceKey];
				if (newTranslations[sourceKey]) {
					targetObject[destKey] = newTranslations[sourceKey];
				} else {
					console.warn(
						`[TranslationService] Unable to find translation for '${sourceKey}' in translations.`
					);
				}
			}
		};
	}
}

import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { IDictionary } from '../../shared/types/Containers/IDictonary/IDictionary';

export interface TranslationMap<TargetType> {
	[sourceKey: string]: TargetType;
}

export interface Translations {
	[labelKey: string]: string;
}

// @dynamic
@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	private translationSubject = new ReplaySubject<Translations>(1);

	constructor() {
		console.log('new TranslationService()');
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
	public static translate<T extends { [key: string]: any }, K extends keyof T = keyof T>(
		targetObject: T,
		translationMap: TranslationMap<K>
	) {
		return function(newTranslations: Translations) {
			for (let sourceKey in translationMap) {
				let destKey = translationMap[sourceKey] as K;
				if (newTranslations[sourceKey]) {
					let newLabel = newTranslations[sourceKey];
					targetObject[destKey] = newLabel;
				} else {
					console.warn(
						`[TranslationService] Unable to find translation for '${sourceKey}' in translations.`
					);
				}
			}
		};
	}

	/**
	 * Get the Translations observable.
	 */
	public getTranslations(): Observable<Translations> {
		return this.translationSubject.asObservable();
	}

	/**
	 * Set the current translation dictionary.  Causes all subscriptions to update.
	 */
	public setTranslations(translations: Translations): this {
		this.translationSubject.next(translations);
		return this;
	}
}
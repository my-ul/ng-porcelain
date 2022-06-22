import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
	selector: 'porcelain-footer, p-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	year = new Date().getFullYear();

	/**
	 * Copyright statement label.  Use %s or %1$s for the current year.
	 */
	@Input() copyrightLabel: string = 'UL LLC © %s. All Rights Reserved.';

	/**
	 * "Online Policies" link label
	 */
	@Input() onlinePoliciesLabel: string = 'Online Policies';

	/**
	 * "About Cookies" link label
	 */
	@Input() aboutCookiesLabel: string = 'About Cookies';

	/**
	 * "Access Your Data" label
	 */
	@Input() accessYourDataLabel: string = 'Access Your Data';

	constructor(private translationService: TranslationService) {
		this.translationService.getTranslations().subscribe(
			TranslationService.translate<FooterComponent>(this, {
				label_sprintf_CopyrightStatement: 'copyrightLabel',
				label_OnlinePolicies: 'onlinePoliciesLabel',
				label_AboutCookies: 'aboutCookiesLabel',
				label_AccessYourData: 'accessYourDataLabel'
			})
		);
	}

	ngOnInit() {}
}

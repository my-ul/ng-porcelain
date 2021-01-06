import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
	selector: 'porcelain-footer, p-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	year = new Date().getFullYear();

	@Input() onlinePoliciesLabel: string = 'Online Policies';
	@Input() aboutCookiesLabel: string = 'About Cookies';
	@Input() accessYourDataLabel: string = 'Access Your Data';

	constructor(private translationService: TranslationService) {
		this.translationService.getTranslations().subscribe(
			TranslationService.translate<FooterComponent>(this, {
				label_OnlinePolicies: 'onlinePoliciesLabel',
				label_AboutCookies: 'aboutCookiesLabel',
				label_AccessYourData: 'accessYourDataLabel'
			})
		);
	}

	ngOnInit() {}
}

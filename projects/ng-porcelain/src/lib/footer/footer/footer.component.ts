import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { LinkDirective } from '../link.directive';

@Component({
	selector: 'porcelain-footer, p-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	readonly year = new Date().getFullYear();

	@ContentChildren(LinkDirective) hyperlinks!: QueryList<LinkDirective>;

	/**
	 * Copyright statement label.  Use %s or %1$s for the current year.
	 */
	@Input() copyrightLabel: string = 'UL LLC © %s. All Rights Reserved.';

	@Input() links: [string, string][] = [
		[
			'Access Your Data',
			'https://submit-irm.trustarc.eu/services/validation/0d4cb432-d0b6-4d78-ba6a-cb3c5a9a4174',
		],
		['Online Policies', 'https://www.ul.com/resources/online-policies'],
		[
			'About Cookies',
			'https://www.ul.com/resources/online-policies/about-cookies',
		],
	];
}

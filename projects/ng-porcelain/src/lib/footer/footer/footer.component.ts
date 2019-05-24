import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'porcelain-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	year = new Date().getFullYear();

	@Input() onlinePoliciesLabel: string = 'Online Policies';
	@Input() aboutCookiesLabel: string = 'About Cookies';
	@Input() accessYourDataLabel: string = 'Access Your Data';

	constructor() {
		console.group('FooterComponent > constructor()');
		// console.log({ arguments });

		console.groupEnd();
	}

	ngOnInit() {}
}

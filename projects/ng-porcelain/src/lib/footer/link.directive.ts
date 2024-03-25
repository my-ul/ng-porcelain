import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: 'a[href][porcelain-link]',
})
export class LinkDirective {
	public readonly templateRef!: TemplateRef<any>;
	constructor(templateRef?: TemplateRef<any>) {
		if (!this.templateRef) {
			throw new Error(
				'porcelain-link must be used as a structural directive, prefixed with an asterisk, i.e., <a *porcelain-link href=""></a>.',
			);
		}
		this.templateRef = templateRef;
	}
}

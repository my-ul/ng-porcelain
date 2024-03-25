import { TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LinkDirective } from './link.directive';

describe('FooterLinkDirective', () => {
	it('should create an instance', () => {
		const directive = new LinkDirective(TestBed.inject(TemplateRef));
		expect(directive).toBeTruthy();
	});
});

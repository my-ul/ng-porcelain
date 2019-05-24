import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';

export const FOOTER_IMPORTS = [CommonModule];
export const FOOTER_DIRECTIVES = [FooterComponent];

@NgModule({
	declarations: FOOTER_DIRECTIVES,
	imports: FOOTER_IMPORTS,
	exports: FOOTER_DIRECTIVES
})
export class FooterModule {}

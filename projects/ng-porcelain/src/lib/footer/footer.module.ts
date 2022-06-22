import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { PipesModule } from '../pipes/pipes.module';

export const FOOTER_IMPORTS = [CommonModule, PipesModule];
export const FOOTER_DIRECTIVES = [FooterComponent];

@NgModule({
	declarations: FOOTER_DIRECTIVES,
	imports: FOOTER_IMPORTS,
	exports: FOOTER_DIRECTIVES
})
export class FooterModule {}

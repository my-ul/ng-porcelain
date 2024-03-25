import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '../pipes/pipes.module';
import { FooterComponent } from './footer/footer.component';
import { LinkDirective } from './link.directive';

export const FOOTER_IMPORTS = [CommonModule, PipesModule];
export const FOOTER_DIRECTIVES = [FooterComponent, LinkDirective];

@NgModule({
	declarations: FOOTER_DIRECTIVES,
	imports: FOOTER_IMPORTS,
	exports: FOOTER_DIRECTIVES,
})
export class FooterModule {}

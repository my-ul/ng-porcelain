import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandoComponent } from './expando/expando.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpandoHeaderComponent } from './expando-header/expando-header.component';
import { ExpandoBodyComponent } from './expando-body/expando-body.component';

export const EXPANDO_DIRECTIVES = [ExpandoComponent, ExpandoHeaderComponent, ExpandoBodyComponent],
	EXPANDO_IMPORTS = [BrowserAnimationsModule, CommonModule, FontAwesomeModule];

@NgModule({
	declarations: EXPANDO_DIRECTIVES,
	imports: EXPANDO_IMPORTS,
	exports: EXPANDO_DIRECTIVES
})
export class ExpandoModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './spinner/spinner.component';

export const SPINNER_DIRECTIVES = [SpinnerComponent];
export const SPINNER_IMPORTS = [CommonModule];

@NgModule({
	declarations: SPINNER_DIRECTIVES,
	imports: SPINNER_IMPORTS,
	exports: SPINNER_DIRECTIVES
})
export class SpinnerModule {}

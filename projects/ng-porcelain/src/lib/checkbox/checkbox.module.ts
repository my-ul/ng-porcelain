import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';

export const CHECKBOX_DIRECTIVES = [CheckboxComponent];
export const CHECKBOX_IMPORTS = [CommonModule];

@NgModule({
	declarations: CHECKBOX_DIRECTIVES,
	imports: CHECKBOX_IMPORTS,
	exports: CHECKBOX_DIRECTIVES
})
export class CheckboxModule {}

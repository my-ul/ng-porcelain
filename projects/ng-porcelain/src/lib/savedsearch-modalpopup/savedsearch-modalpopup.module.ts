import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedsearchModalpopupComponent } from './savedsearch-modalpopup/savedsearch-modalpopup.component';

export const SAVEDSEARCHMODAL_DIRECTIVES = [SavedsearchModalpopupComponent];
export const SAVEDSEARCHMODAL_IMPORTS = [CommonModule];

@NgModule({
	declarations: SAVEDSEARCHMODAL_DIRECTIVES,
	imports: SAVEDSEARCHMODAL_IMPORTS,
	exports: SAVEDSEARCHMODAL_DIRECTIVES
})
export class SavedsearchModalpopupModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiSelectComponent } from './multiselect/multiselect.component';
import { TruncateModule } from '../truncate/truncate.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const MULTISELECT_DIRECTIVES = [MultiSelectComponent];
export const MULTISELECT_IMPORTS = [
	CommonModule,
	FontAwesomeModule,
	BrowserAnimationsModule,
	TruncateModule
];

@NgModule({
	declarations: MULTISELECT_DIRECTIVES,
	imports: MULTISELECT_IMPORTS,
	exports: MULTISELECT_DIRECTIVES
})
export class MultiSelectModule {}

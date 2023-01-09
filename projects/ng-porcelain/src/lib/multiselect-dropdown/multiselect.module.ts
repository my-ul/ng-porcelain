import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MultiSelectComponent } from './multiselect/multiselect.component';
import { TruncateModule } from '../truncate/truncate.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const MULTISELECT_DIRECTIVES = [MultiSelectComponent];
export const MULTISELECT_IMPORTS = [CommonModule, FontAwesomeModule, TruncateModule, FormsModule];

@NgModule({
	declarations: MULTISELECT_DIRECTIVES,
	imports: MULTISELECT_IMPORTS,
	exports: MULTISELECT_DIRECTIVES
})
export class MultiSelectModule {}

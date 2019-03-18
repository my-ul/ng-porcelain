import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SimpleRefinerComponent } from './simple-refiner.component';
import { TruncateModule } from '../truncate/truncate.module';

export const SIMPLE_REFINER_DIRECTIVES = [SimpleRefinerComponent];

export const SIMPLE_REFINER_IMPORTS = [
	CommonModule,
	FormsModule,
	BrowserAnimationsModule,
	FontAwesomeModule,
	TruncateModule
];

@NgModule({
	imports: SIMPLE_REFINER_IMPORTS,
	declarations: SIMPLE_REFINER_DIRECTIVES,
	exports: SIMPLE_REFINER_DIRECTIVES
})
export class SimpleRefinerModule {}

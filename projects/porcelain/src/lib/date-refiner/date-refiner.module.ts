import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Porcelain/truncate
import { TruncateModule } from '../truncate/truncate.module';

// DateRefiner
import { DateRefinerComponent } from './date-refiner.component';

export const DATE_REFINER_DIRECTIVES = [DateRefinerComponent];

export const DATE_REFINER_IMPORTS = [
	CommonModule,
	FormsModule,
	FontAwesomeModule,
	BrowserAnimationsModule,
	TruncateModule
];

@NgModule({
	imports: DATE_REFINER_IMPORTS,
	declarations: DATE_REFINER_DIRECTIVES,
	exports: DATE_REFINER_DIRECTIVES
})
export class DateRefinerModule {}

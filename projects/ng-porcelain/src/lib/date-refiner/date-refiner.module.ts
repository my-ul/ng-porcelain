// From Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

// From Porcelain
import { TruncateModule } from '../truncate/truncate.module';

// From Module
import { DateRefinerComponent } from './date-refiner/date-refiner.component';
import { ExpandoModule } from '../expando/expando.module';

export const DATE_REFINER_DIRECTIVES = [DateRefinerComponent];

export const DATE_REFINER_IMPORTS = [
	CommonModule,
	FormsModule,
	FontAwesomeModule,
	TruncateModule,
	AngularMyDatePickerModule,
	ExpandoModule
];

@NgModule({
	declarations: DATE_REFINER_DIRECTIVES,
	imports: DATE_REFINER_IMPORTS,
	exports: DATE_REFINER_DIRECTIVES
})
export class DateRefinerModule {}

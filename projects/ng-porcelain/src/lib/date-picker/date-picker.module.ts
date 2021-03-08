import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { datePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//directives

export const DATE_PICKER_DIRECTIVES = [datePickerComponent];

export const DATE_PICKER_IMPORTS = [
	AngularMyDatePickerModule,
	CommonModule,
	FormsModule,
	FontAwesomeModule
];

@NgModule({
	declarations: DATE_PICKER_DIRECTIVES,
	imports: DATE_PICKER_IMPORTS,
	exports: DATE_PICKER_DIRECTIVES
})
export class DatePickerModule {}

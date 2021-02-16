import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CalenderControlComponent } from './calender-control/calender-control.component';
import { FormsModule } from '@angular/forms';

//directives

export const DATE_PICKER_DIRECTIVES = [CalenderControlComponent];

export const DATE_PICKER_IMPORTS = [AngularMyDatePickerModule, CommonModule, FormsModule];

@NgModule({
	declarations: DATE_PICKER_DIRECTIVES,
	imports: DATE_PICKER_IMPORTS,
	exports: DATE_PICKER_DIRECTIVES
})
export class DatePickerModule {}

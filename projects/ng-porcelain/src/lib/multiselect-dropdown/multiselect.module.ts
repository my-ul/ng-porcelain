import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiSelectComponent } from './multiselect/multiselect.component';
import { ToolbarSelectComponent } from '../toolbar/toolbar-select/toolbar-select.component';
import { ToolbarSelectedTemplateComponent } from '../toolbar/toolbar-selected-template/toolbar-selected-template.component';
import { ToolbarOptionComponent } from '../toolbar/toolbar-option/toolbar-option.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const MULTISELECT_DIRECTIVES = [
	MultiSelectComponent,
	ToolbarSelectComponent,
	ToolbarSelectedTemplateComponent,
	ToolbarOptionComponent
];
export const MULTISELECT_IMPORTS = [CommonModule, FontAwesomeModule, BrowserAnimationsModule];

@NgModule({
	declarations: MULTISELECT_DIRECTIVES,
	imports: MULTISELECT_IMPORTS,
	exports: MULTISELECT_DIRECTIVES
})
export class MultiSelectModule {}

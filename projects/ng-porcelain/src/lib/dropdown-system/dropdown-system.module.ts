import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import directives
import { DropdownSelectComponent } from './dropdown-select/dropdown-select.component';
import { DropdownSelectOptionComponent } from './dropdown-select-option/dropdown-select-option.component';
import { DropdownSelectedTemplateComponent } from './dropdown-selected-template/dropdown-selected-template.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../pipes/pipes.module';

export const DROPDOWNSYSTEM_DIRECTIVES = [
	DropdownSelectComponent,
	DropdownSelectOptionComponent,
	DropdownSelectedTemplateComponent
];

export const DROPDOWNSYSTEM_IMPORTS = [CommonModule, FormsModule, PipesModule, FontAwesomeModule];

@NgModule({
	declarations: DROPDOWNSYSTEM_DIRECTIVES,
	imports: DROPDOWNSYSTEM_IMPORTS,
	exports: DROPDOWNSYSTEM_DIRECTIVES
})
export class DropdownSystemModule {}

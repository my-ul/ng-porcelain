import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSelectComponent } from './dropdown-select/dropdown-select.component';
import { DropdownSelectOptionComponent } from './dropdown-select-option/dropdown-select-option.component';
import { DropdownSelectedTemplateComponent } from './dropdown-selected-template/dropdown-selected-template.component';

@NgModule({
	declarations: [
		DropdownSelectComponent,
		DropdownSelectOptionComponent,
		DropdownSelectedTemplateComponent
	],
	imports: [CommonModule]
})
export class DropdownSystemModule {}

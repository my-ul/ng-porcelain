import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//import fortawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Import Directives
import { SelectDropdownComponent1 } from './select-dropdown/select-dropdown.component';

//Import custom search pipe
import { SearchPipePipe } from './pipes/search-pipe.pipe';

export const SELECT_DROPDOWN_DIRECTIVES = [SelectDropdownComponent1, SearchPipePipe];
export const SELECT_DROPDOWN_IMPORTS = [CommonModule, FormsModule, FontAwesomeModule];

@NgModule({
	declarations: SELECT_DROPDOWN_DIRECTIVES,
	imports: SELECT_DROPDOWN_IMPORTS,
	exports: SELECT_DROPDOWN_DIRECTIVES
})
export class SelectDropdownModule1 {}

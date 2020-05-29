import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchInputComponent } from './search-input/search-input.component';

export const SEARCH_INPUT_DIRECTIVES = [SearchInputComponent];
export const SEARCH_INPUT_IMPORTS = [CommonModule, FontAwesomeModule, FormsModule];

@NgModule({
	declarations: SEARCH_INPUT_DIRECTIVES,
	imports: SEARCH_INPUT_IMPORTS,
	exports: SEARCH_INPUT_DIRECTIVES
})
export class SearchInputModule {}

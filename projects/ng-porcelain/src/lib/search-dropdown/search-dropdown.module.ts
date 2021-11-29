import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Import Directives
import { SearchDropdownComponent } from './search-dropdown/search-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../pipes/pipes.module';
import { SearchInputModule } from '../search-input/search-input.module';
export const SEARCHDROPDOWN_DIRECTIVES = [SearchDropdownComponent];
export const SEARCHDROPDOWN_IMPORTS = [
	CommonModule,
	FormsModule,
	PipesModule,
	FontAwesomeModule,
	SearchInputModule
];

@NgModule({
	declarations: SEARCHDROPDOWN_DIRECTIVES,
	imports: SEARCHDROPDOWN_IMPORTS,
	exports: SEARCHDROPDOWN_DIRECTIVES
})
export class SearchDropdownModule {}

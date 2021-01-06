import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRefinerComponent } from './search-refiner/search-refiner.component';
import { ExpandoModule } from '../expando/expando.module';
import { TruncateModule } from '../truncate/truncate.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '../pipes/pipes.module';

export const SEARCH_REFINER_IMPORTS = [
	CommonModule,
	FormsModule,
	ExpandoModule,
	TruncateModule,
	PipesModule,
	FontAwesomeModule
];
export const SEARCH_REFINER_DIRECTIVES = [SearchRefinerComponent];

@NgModule({
	declarations: SEARCH_REFINER_DIRECTIVES,
	imports: SEARCH_REFINER_IMPORTS,
	exports: SEARCH_REFINER_DIRECTIVES
})
export class SearchRefinerModule {}

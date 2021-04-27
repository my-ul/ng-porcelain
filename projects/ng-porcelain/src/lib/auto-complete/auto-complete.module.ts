import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

////Import Directives
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../pipes/pipes.module';
import { SpinnerModule } from '../spinner/spinner.module';

export const AUTOCOMPLETE_DIRECTIVES = [AutoCompleteComponent];
export const AUTOCOMPLETE_IMPORTS = [
	CommonModule,
	FormsModule,
	PipesModule,
	FontAwesomeModule,
	SpinnerModule
];

@NgModule({
	declarations: AUTOCOMPLETE_DIRECTIVES,
	imports: AUTOCOMPLETE_IMPORTS,
	exports: AUTOCOMPLETE_DIRECTIVES
})
export class AutoCompleteModule {}

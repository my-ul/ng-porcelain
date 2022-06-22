import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleRadioRefinerComponent } from './simple-radio-refiner/simple-radio-refiner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncateModule } from '../truncate/truncate.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ExpandoModule } from '../expando/expando.module';
// import { TooltipModule } from 'ng2-tooltip-directive';

export const SIMPLE_RADIO_REFINER_DIRECTIVES = [SimpleRadioRefinerComponent];

export const SIMPLE_RADIO_REFINER_IMPORTS = [
	CommonModule,
	FormsModule,
	FontAwesomeModule,
	TruncateModule,
	PipesModule,
	ExpandoModule
	// TooltipModule
];

@NgModule({
	declarations: SIMPLE_RADIO_REFINER_DIRECTIVES,
	imports: SIMPLE_RADIO_REFINER_IMPORTS,
	exports: SIMPLE_RADIO_REFINER_DIRECTIVES
})
export class SimpleRadioRefinerModule {}

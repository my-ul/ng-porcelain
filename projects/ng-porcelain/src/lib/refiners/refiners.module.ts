import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateRefinerModule } from '../date-refiner/date-refiner.module';
import { SimpleRefinerModule } from '../simple-refiner/simple-refiner.module';
import { SimpleRadioRefinerModule } from '../simple-radio-refiner/simple-radio-refiner.module';
import { SearchRefinerModule } from '../search-refiner/search-refiner.module';
import { CollapsableRefinerModule } from '../collapsable-refiner/collapsable-refiner/collapsable-refiner.module';
import { RefinersComponent } from './refiners/refiners.component';

export const REFINERS_DIRECTIVES = [RefinersComponent];

export const REFINERS_IMPORTS = [
	CommonModule,
	DateRefinerModule,
	SimpleRefinerModule,
	SimpleRadioRefinerModule,
	SearchRefinerModule,
	CollapsableRefinerModule
];

@NgModule({
	declarations: REFINERS_DIRECTIVES,
	imports: REFINERS_IMPORTS,
	exports: REFINERS_DIRECTIVES
})
export class RefinersModule {}

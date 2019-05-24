import { NgModule } from '@angular/core';
import { DateRefinerModule } from './date-refiner/date-refiner.module';
import { SimpleRefinerModule } from './simple-refiner/simple-refiner.module';
import { PorcelainComponent } from './porcelain.component';
import { RefinersModule } from './refiners/refiners.module';

const PORCELAIN_IMPORTS = [
	// RefinersModule,
	// SimpleRefinerModule,
	// DateRefinerModule
];

const PORCELAIN_DIRECTIVES = [PorcelainComponent];

@NgModule({
	imports: PORCELAIN_IMPORTS,
	declarations: PORCELAIN_DIRECTIVES,
	exports: PORCELAIN_DIRECTIVES
})
export class PorcelainModule {}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RefinersComponent } from './refiners.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRefinerModule } from '../date-refiner/date-refiner.module';
import { SimpleRefinerModule } from '../simple-refiner/simple-refiner.module';

export const REFINERS_DIRECTIVES = [RefinersComponent];

export const REFINERS_IMPORTS = [
	CommonModule,
	FormsModule,
	DateRefinerModule,
	SimpleRefinerModule,
	BrowserAnimationsModule
];

@NgModule({
	imports: REFINERS_IMPORTS,
	exports: REFINERS_DIRECTIVES,
	declarations: REFINERS_DIRECTIVES
})
export class RefinersModule {}

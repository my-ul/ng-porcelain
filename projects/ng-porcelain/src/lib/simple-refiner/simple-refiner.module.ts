import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleRefinerComponent } from './simple-refiner/simple-refiner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruncateModule } from '../truncate/truncate.module';
import { FormsModule } from '@angular/forms';
import { InterpolateModule } from '../interpolate/interpolate.module';

export const SIMPLE_REFINER_DIRECTIVES = [SimpleRefinerComponent];

export const SIMPLE_REFINER_IMPORTS = [
	CommonModule,
	FormsModule,
	FontAwesomeModule,
	TruncateModule,
	InterpolateModule
];

@NgModule({
	declarations: SIMPLE_REFINER_DIRECTIVES,
	imports: SIMPLE_REFINER_IMPORTS,
	exports: SIMPLE_REFINER_DIRECTIVES
})
export class SimpleRefinerModule {}

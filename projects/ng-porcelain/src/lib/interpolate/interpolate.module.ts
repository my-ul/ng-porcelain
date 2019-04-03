import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterpolatePipe } from './interpolate.pipe';

export const INTERPOLATE_IMPORTS = [CommonModule];

export const INTERPOLATE_DIRECTIVES = [InterpolatePipe];

@NgModule({
	declarations: INTERPOLATE_DIRECTIVES,
	imports: INTERPOLATE_IMPORTS,
	exports: INTERPOLATE_DIRECTIVES
})
export class InterpolateModule {}

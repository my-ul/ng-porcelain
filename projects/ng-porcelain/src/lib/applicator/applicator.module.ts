import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';

import { ApplicatorComponent } from './applicator/applicator.component';
import { RefinersModule } from '../refiners/refiners.module';

export const APPLICATOR_DIRECTIVES = [ApplicatorComponent];
export const APPLICATOR_IMPORTS = [CommonModule, RefinersModule, AngularStickyThingsModule];

@NgModule({
	declarations: APPLICATOR_DIRECTIVES,
	imports: APPLICATOR_IMPORTS,
	exports: APPLICATOR_DIRECTIVES
})
export class ApplicatorModule {}

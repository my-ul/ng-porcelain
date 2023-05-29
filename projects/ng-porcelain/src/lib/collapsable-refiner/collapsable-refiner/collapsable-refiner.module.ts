import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsableRefinerComponent } from '../collapsable-refiner/collapsable-refiner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpandoModule } from 'projects/ng-porcelain/src/lib/expando/expando.module';
import { TruncateModule } from 'projects/ng-porcelain/src/lib/truncate/truncate.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'projects/ng-porcelain/src/lib/pipes/pipes.module';

export const COLLAPSABLEREFINER_DIRECTIVES = [CollapsableRefinerComponent];
export const COLLAPSABLEREFINER_IMPORTS = [
	CommonModule,
	FontAwesomeModule,
	ExpandoModule,
	TruncateModule,
	FormsModule,
	PipesModule
];

@NgModule({
	declarations: COLLAPSABLEREFINER_DIRECTIVES,
	imports: COLLAPSABLEREFINER_IMPORTS,
	exports: COLLAPSABLEREFINER_DIRECTIVES
})
export class CollapsableRefinerModule {}

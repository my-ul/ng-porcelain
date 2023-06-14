import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupingRefinerComponent } from '../grouping-refiner/grouping-refiner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpandoModule } from 'projects/ng-porcelain/src/lib/expando/expando.module';
import { TruncateModule } from 'projects/ng-porcelain/src/lib/truncate/truncate.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'projects/ng-porcelain/src/lib/pipes/pipes.module';

export const GROUPINGREFINER_DIRECTIVES = [GroupingRefinerComponent];
export const GROUPINGREFINER_IMPORTS = [
	CommonModule,
	FontAwesomeModule,
	ExpandoModule,
	TruncateModule,
	FormsModule,
	PipesModule
];

@NgModule({
	declarations: GROUPINGREFINER_DIRECTIVES,
	imports: GROUPINGREFINER_IMPORTS,
	exports: GROUPINGREFINER_DIRECTIVES
})
export class GroupingRefinerModule {}

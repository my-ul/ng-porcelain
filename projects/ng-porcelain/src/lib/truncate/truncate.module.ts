import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateComponent } from './truncate/truncate.component';
import { PipesModule } from '../pipes/pipes.module';

const TRUNCATE_DIRECTIVES = [TruncateComponent];

const TRUNCATE_IMPORTS = [CommonModule, PipesModule];

@NgModule({
	declarations: TRUNCATE_DIRECTIVES,
	imports: TRUNCATE_IMPORTS,
	exports: TRUNCATE_DIRECTIVES
})
export class TruncateModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateComponent } from './truncate/truncate.component';

const TRUNCATE_DIRECTIVES = [TruncateComponent];

const TRUNCATE_IMPORTS = [CommonModule];

@NgModule({
	declarations: TRUNCATE_DIRECTIVES,
	imports: TRUNCATE_IMPORTS,
	exports: TRUNCATE_DIRECTIVES
})
export class TruncateModule {}

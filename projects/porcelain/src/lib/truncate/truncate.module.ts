import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateComponent } from './truncate.component';

const TRUNCATE_DIRECTIVES = [TruncateComponent];

@NgModule({
	imports: [CommonModule],
	declarations: TRUNCATE_DIRECTIVES,
	exports: TRUNCATE_DIRECTIVES,
})
export class TruncateModule {}

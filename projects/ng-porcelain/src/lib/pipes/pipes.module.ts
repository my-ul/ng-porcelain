import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintfPipe } from './sprintf/sprintf.pipe';
import { CeilPipe } from './ceil/ceil.pipe';
import { FloorPipe } from './floor/floor.pipe';
import { RoundPipe } from './round/round.pipe';

export const PIPES_IMPORTS = [CommonModule];
export const PIPES_DIRECTIVES = [SprintfPipe, CeilPipe, FloorPipe, RoundPipe];

@NgModule({
	declarations: PIPES_DIRECTIVES,
	imports: PIPES_IMPORTS,
	exports: PIPES_DIRECTIVES
})
export class PipesModule {}

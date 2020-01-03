import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintfPipe } from './sprintf/sprintf.pipe';
import { CeilPipe } from './ceil/ceil.pipe';
import { FloorPipe } from './floor/floor.pipe';
import { RoundPipe } from './round/round.pipe';
import { ToLocaleStringPipe } from '.';

export const PIPES_IMPORTS = [CommonModule];
export const PIPES_DIRECTIVES = [CeilPipe, FloorPipe, RoundPipe, SprintfPipe, ToLocaleStringPipe];

@NgModule({
	declarations: PIPES_DIRECTIVES,
	imports: PIPES_IMPORTS,
	exports: PIPES_DIRECTIVES
})
export class PipesModule {}

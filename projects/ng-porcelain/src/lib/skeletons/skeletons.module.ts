import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonWordComponent } from './word/word.component';
import { SkeletonLineComponent } from './line/line.component';
import { SkeletonBlockComponent } from './block/block.component';
import { SkeletonParagraphComponent } from './paragraph/paragraph.component';

export const SKELETON_DIRECTIVES = [
	SkeletonBlockComponent,
	SkeletonWordComponent,
	SkeletonParagraphComponent,
	SkeletonLineComponent
];

export const SKELETON_IMPORTS = [CommonModule];

@NgModule({
	declarations: SKELETON_DIRECTIVES,
	imports: SKELETON_IMPORTS,
	exports: SKELETON_DIRECTIVES
})
export class SkeletonsModule {}

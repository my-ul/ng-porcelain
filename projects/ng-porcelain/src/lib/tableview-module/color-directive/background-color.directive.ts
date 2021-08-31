import { Directive, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[bgColorModify]'
})
export class BackgroundColorDirective {
	@Input() Index: number;
	@Input() oddColor: string = '#EDF1F6';
	@Input() evenColor: string = '#FFFFFF';

	constructor(private _ElementRef: ElementRef, private _renderer: Renderer2) {}
	ngOnInit(): void {}

	//onchanges lifecycle hook
	ngOnChanges(changes: SimpleChanges): void {
		if (this.Index % 2 == 0) {
			// not safe this.el.nativeElement.style.backgroundColor = this.evencolor;
			this._renderer.setStyle(this._ElementRef.nativeElement, 'background-color', this.evenColor);
		} else {
			//not safe this.el.nativeElement.style.backgroundColor = this.oddcolor;
			this._renderer.setStyle(this._ElementRef.nativeElement, 'background-color', this.oddColor);
		}
	}
}

import { Directive, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[bgColorModify]'
})
export class BackgroundColorDirective {
	@Input() Index: number;
	oddcolor: string = '#EDF1F6';
	evencolor: string = '#FFFFFF';

	constructor(private el: ElementRef, private renderer: Renderer2) {}
	ngOnInit(): void {}

	//onchanges lifecycle hook
	ngOnChanges(changes: SimpleChanges): void {
		if (this.Index % 2 == 0) {
			// not safe this.el.nativeElement.style.backgroundColor = this.evencolor;
			this.renderer.setStyle(this.el.nativeElement, 'background-color', this.evencolor);
		} else {
			//not safe this.el.nativeElement.style.backgroundColor = this.oddcolor;
			this.renderer.setStyle(this.el.nativeElement, 'background-color', this.oddcolor);
		}
	}
}

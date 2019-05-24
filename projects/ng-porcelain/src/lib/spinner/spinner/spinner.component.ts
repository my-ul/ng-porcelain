import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'porcelain-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	@Input() loadingLabel: string = 'Loading…';

	constructor() {
		console.group('SpinnerComponent > constructor()');
		// console.log({ arguments });

		console.groupEnd();
	}

	ngOnInit() {}
}

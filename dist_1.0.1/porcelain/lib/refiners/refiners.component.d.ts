import { OnInit, EventEmitter } from '@angular/core';
import { RefinerBase } from './IRefiner';
export declare class RefinersComponent implements OnInit {
    refiners: RefinerBase[];
    onRefinersChange: EventEmitter<any>;
    values: {
        [slug: string]: string[];
    };
    constructor();
    ngOnInit(): void;
    handleRefinerChange(update: [string, any]): void;
    setValue(slug: string, value: any): void;
    toQueryString(): string;
}

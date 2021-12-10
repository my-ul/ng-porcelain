// Storybook
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { DROPDOWNSYSTEM_DIRECTIVES, DROPDOWNSYSTEM_IMPORTS } from './dropdown-system.module';
import {
	faSearch,
	faExpandArrowsAlt,
	faCaretLeft,
	faCaretRight,
	faShare
} from '@fortawesome/free-solid-svg-icons';
export default {
	title: 'DropDown System/Select',

	decorators: [
		moduleMetadata({
			declarations: DROPDOWNSYSTEM_DIRECTIVES,
			imports: DROPDOWNSYSTEM_IMPORTS
		})
	]
};

export const DefaultPresentation = () => {
	return {
		template: `       
                    

                   
                        <porcelain-dropdown-select [(value)]="value">
                            <porcelain-dropdown-selectedtemplate *ngIf="value">
                                {{options[value].name}}
                            </porcelain-dropdown-selectedtemplate>
                            <porcelain-dropdown-selectedtemplate *ngIf="!value">
                                &mdash;
                            </porcelain-dropdown-selectedtemplate>
                            <porcelain-dropdown-selectoption [value]="option.value" *ngFor="let option of getValues(options)">
                                <strong>{{option.name}}</strong>&nbsp;&nbsp;<span style="font-size: 90%; color: #888">{{option.group}}</span><br>
                                {{option.value}}@ul.com
                            </porcelain-dropdown-selectoption>
                        </porcelain-dropdown-select>              

                   
                
            `,
		props: {
			label: 'To:',
			value: null,
			getValues(dict) {
				return Object.values(dict);
			},
			options: {
				'keith.carmody': {
					value: 'keith.carmody',
					name: 'Keith Carmody',
					group: 'Northbrook, IL'
				},
				'brad.kovach': { value: 'brad.kovach', name: 'Brad Kovach', group: 'Laramie, WY' },
				'arjun.rapaka': { value: 'arjun.rapaka', name: 'Arjun Rapaka', group: 'Canada' },
				'matt.gardner': {
					value: 'matt.gardner',
					name: 'Matt Gardner',
					group: 'Laramie, WY'
				},
				'richard.heinig': {
					value: 'richard.heinig',
					name: 'Richard Heinig',
					group: 'Laramie, WY'
				}
			},
			onSelectedValueChange: action('new option selected')
		}
	};
};

DefaultPresentation.story = {
	name: 'Example: Simple Name Select'
};

export const searchBoxPresentation = () => {
	return {
		template: `       
                    

                   
                        <porcelain-dropdown-select [(value)]="value">
                            <porcelain-dropdown-selectedtemplate>
                                <porcelain-dropdown-inputbox [(query)]="searchText"></porcelain-dropdown-inputbox>
                            </porcelain-dropdown-selectedtemplate>                            
                            <porcelain-dropdown-selectoption [value]="option.value" *ngFor="let option of getValues(options)">
                                <strong>{{option.name}}</strong>&nbsp;&nbsp;<span style="font-size: 90%; color: #888">{{option.group}}</span><br>
                                {{option.value}}@ul.com
                            </porcelain-dropdown-selectoption>
                        </porcelain-dropdown-select>              

                   
                
            `,
		props: {
			label: 'To:',
			value: null,
			searchText: '',
			getValues(dict) {
				return Object.values(dict);
			},
			options: {
				'keith.carmody': {
					value: 'keith.carmody',
					name: 'Keith Carmody',
					group: 'Northbrook, IL'
				},
				'brad.kovach': { value: 'brad.kovach', name: 'Brad Kovach', group: 'Laramie, WY' },
				'arjun.rapaka': { value: 'arjun.rapaka', name: 'Arjun Rapaka', group: 'Canada' },
				'matt.gardner': {
					value: 'matt.gardner',
					name: 'Matt Gardner',
					group: 'Laramie, WY'
				},
				'richard.heinig': {
					value: 'richard.heinig',
					name: 'Richard Heinig',
					group: 'Laramie, WY'
				}
			},
			onSelectedValueChange: action('new option selected')
		}
	};
};

searchBoxPresentation.story = {
	name: 'search box presentation'
};

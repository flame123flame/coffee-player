

import { Injectable } from '@angular/core';

declare var $: any;
declare var contextPath: string;

@Injectable({
	providedIn: 'root',
})
export class CommonService {
	public localPath = location.origin + location.pathname;
	private gif = this.localPath + 'assets/image/loading2.svg';
	count = 0;
	constructor() { }

	public loading() {
		this.count += 1;

		$.blockUI({
			message: '<div class="container h-100 d-flex justify-content-center"><img src="' + this.gif + '" height="150px"/></div>',
			overlayCSS: {
				background: 'rgba(0, 0, 0)',
				opacity: 0.9,
				cursor: 'wait'

			},
			css: {
				background: 'none',
				border: 'none',
			}
		});
	}
	public unLoading() {
		this.count -= 1;
		if (this.count < 0) {
			this.count = 0
		}
		if (this.count != 0) {
			return
		}
		$.unblockUI();
	}

	public configDataTable() {
		return {
			pagingType: 'full_numbers',
			ordering: false,
			scrollX: true,
			lengthChange: false,
			info: false,
			pageLength: 20,
			searching: false,
			processing: true,
			serverSide: false
		};
	}
}

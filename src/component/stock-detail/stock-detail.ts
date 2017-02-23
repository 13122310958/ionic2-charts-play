import {Component, Input, OnInit} from '@angular/core';
import {StockInfo} from '../../providers/stock-info';

import { Platform } from 'ionic-angular';

@Component({
    selector: 'stock-detail',
    templateUrl: './stock-detail.html',
})

export class StockDetailCmp {
    @Input() symbol;
    detail = {};
    constructor(public stockInfo: StockInfo, public platform: Platform) {
		this.platform.ready().then(() => {

		});
    }
    
    ngOnInit() {
        this.stockInfo.getDetail(this.symbol)
        .subscribe(data => {
            this.detail = data;
        });
    }
    
}
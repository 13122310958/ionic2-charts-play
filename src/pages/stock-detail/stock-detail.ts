import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {StockInfo} from '../../providers/stock-info';

import { SQLite } from 'ionic-native';

@Component({
    templateUrl: './stock-detail.html'
})
export class StockDetail {
	// Details info
	public db: SQLite;
	
    month:number = 1;
    details:{};
    quote:any;
    data:any;
    constructor(params: NavParams, public stockinfo:StockInfo) {
		this.db = new SQLite();
		
        this.quote = params.get('quote');  
		console.log("Detail Quote: " + this.quote);
        this.getChartData();
    }
    
    getChartData() {
            this.stockinfo.getChart(this.quote.symbol, this.month)
            .subscribe(data=> {
            let newData:any = {};
            newData.series = [];
            newData.series.push({meta: 'Low', name: 'Low', data:[]});
            newData.series.push({meta: 'Close',name: 'Close', data:[]});
            data.forEach(day=> {
                newData.series[0].data.unshift(Number.parseFloat(day.Low));
                newData.series[1].data.unshift(Number.parseFloat(day.Close));
            });
                this.data = newData;          
            });        
    }
}
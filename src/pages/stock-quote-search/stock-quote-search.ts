import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NavController, ViewController, Events} from 'ionic-angular';
import {StockInfo} from '../../providers/stock-info';

import { Platform } from 'ionic-angular';

import { SQLite } from 'ionic-native';

import {StockDetail} from '../stock-detail/stock-detail';

@Component({
    templateUrl: './stock-quote-search.html'
})
export class StockQuoteSearch {
	public db: SQLite;
	
    searchbar = new FormControl();
    quoteList:Array<any>;
	
    constructor(public nav:NavController, public stockInfo: StockInfo, public vc:ViewController, public events:Events, public platform: Platform) {
		this.platform.ready().then(() => {
			this.db = new SQLite();
			
			this.searchbar.valueChanges
			.filter(value => value.trim().length > 2)
			.distinctUntilChanged()
			.debounceTime(2000)
			.subscribe(value => {
				this.search(value);
			});
		});
    }
    
    search(value) {
        this.stockInfo.getQuotes(value)
        .subscribe(list => {
            this.quoteList = list;
        });
    }
    
    watch(quote) {
		console.log(quote.symbol);
		console.log(quote.name);
		console.log(this.quoteList);
		
        this.events.publish("stock:watch", quote, this.quoteList);
		
		var self = this;
		let quoteEnter: any;
		this.db.openDatabase({
			name: 'data.db',
			location: 'default'
			}).then(() => {
			quoteEnter = quote;
			console.log(quoteEnter);
			console.log(quoteEnter.symbol);
			this.db.executeSql(`insert into quotes values('${quoteEnter.symbol}', '${quoteEnter}');`, {}).then(data => {
			console.log("INSERTED Quote: " + JSON.stringify(data.rows));
			});
			console.log("Quote Search setQuote Success");
			
		}, (err) => {
			console.error('Unable to open database: ', err);
			console.log("Quote Search Fail");
		});
		
		this.nav.push(StockDetail, {quote:quote});
    }
    
    close() {
        this.vc.dismiss();
    }
}
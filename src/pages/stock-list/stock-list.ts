import {Component} from '@angular/core';
import {NavController, ModalController, Events} from 'ionic-angular';
import {StockQuoteSearch} from '../stock-quote-search/stock-quote-search';
import {StockDetail} from '../stock-detail/stock-detail';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';

import {StockCmp} from '../../component/stock/stock';
import {StockChart} from '../../component/stock-chart/stock-chart';

@Component({
  templateUrl: './stock-list.html',
  providers: [StockCmp, StockChart]
})
export class StockList {
  
  // Our main quote List which stores all the quote searches
  quoteList = [];
  run:Boolean;
  
  public db: SQLite;
  
  constructor(public nav:NavController, public events: Events, public modalCtrl: ModalController, public platform: Platform) {
	
	this.platform.ready().then(() => {
		this.db = new SQLite();
		
		var self = this;
        this.db.openDatabase({
			name: 'data.db',
			location: 'default'
			}).then(() => {
			this.db.executeSql("create table IF NOT EXISTS quotes(stock unique, value)", {});
		});
		
		let returnData: any;
        this.db.openDatabase({
			name: 'data.db',
			location: 'default'
			}).then(() => {
			this.db.executeSql("select * from quotes", {}).then(data => {
			console.log("INSERTED: " + JSON.stringify(data));
			
		  let result = data.rows;
		  console.log(result);
		  for(let i=0; i < result.length; i++) {
			// Push every quotes from the list (* from quotes....)
			this.quoteList.push(JSON.parse(result.item(i).value));
			console.log("Initial Stock List: " + this.quoteList);
			console.log(result.item(i));
			console.log("Result Item Value: " + result.item(i).value);
		  }
		});
			console.log("StockList getAllQuotes Success");
		}, (err) => {
			console.error('Unable to open database: ', err);
		});
		
		// 'stock:watch' is subsribed here
		this.events.subscribe("stock:watch", (stock, quoteList) => {
		  this.quoteList.push(stock);
		  console.log("Event subscribed stock[0]: " + stock);
		  console.log("Event subscribed: " + this.quoteList);
		  console.log("Proper QuoteList: " + quoteList);
		});
	});
   }
  
  searchQuote() {
    let modal = this.modalCtrl.create(StockQuoteSearch);
    modal.present();
  }
  
  deleteItem(index, symbol) {
	this.platform.ready().then(() => {
		var self = this;
		let returnData: any;
        this.db.openDatabase({
			name: 'data.db',
			location: 'default' // the location field is required
			}).then(() => {
			this.db.executeSql(`delete from quotes where stock='${symbol}'`, {}).then(()=>{
		  this.quoteList.splice(index, 1);
		});
			console.log("StockList removeQuote Success");
		}, (err) => {
			console.error('Unable to open database: ', err);
			console.log("StockList removeQuote Fail");
		});
	});
  }
  
  // Runs when the page is about to enter and become the active page.
  ionViewWillEnter() {
	this.run = true;
  }
  
  // Runs when the page is about to leave and no longer be the active page.
  ionViewWillLeave() {
    this.run = false;
  }
  
  openDetail(quote) {
    this.nav.push(StockDetail, {quote:quote});
  }
 
}

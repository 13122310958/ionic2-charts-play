import {Component, Input, Output, OnChanges, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {ViewController, Events} from 'ionic-angular';
import {Http} from '@angular/http';
import {StockInfo} from '../../providers/stock-info';

import {Subscription} from 'rxjs/Rx';

import { Platform } from 'ionic-angular';

@Component({
    selector: 'stock',
    templateUrl: './stock.html'
})

export class StockCmp {
	// Our inputs
	// Sliding options
    @Input() sliding;
    @Input() info;
    @Input() run;
    @Output() delete =  new EventEmitter();
    data = {};
    down:Boolean;
    loading:Boolean;
    symbolStock:any;
    subscription:Subscription;
	
    constructor(public http:Http, public ss:StockInfo, public vc: ViewController, public events:Events, public platform: Platform) {
		
		this.platform.ready().then(() => {
		this.loading = true;
		   this.sliding = (this.sliding === "true");
		   console.log("Info Stock: " + this.info);
		   
		   //if (this.info != null) {
			   this.symbolStock = this.ss.getPriceInfo(this.info.symbol);
			   this.subscription =  this.symbolStock.subscribe(data => {
				   this.data = data;
				   this.loading = false;
			   });        
		   //}
		});
    }
    
    percentageSign(value) {
        if(value === undefined || value === null) {
            return 'number';
        } else if(value[0] ==="-") {
           this.down = true;
           return 'percentage_neg'
        } else {
            this.down = false;
            return 'percentage_pos';
        }
    }
    
    ngOnChanges() {
        if(this.run) {
           if(this.symbolStock && this.subscription) {
                this.subscription =  this.symbolStock.subscribe(data => {
                    this.data = data;
                    this.loading = false;
                });
           }
        } else {
           if(this.subscription) {
             this.subscription.unsubscribe();  
           }
        }
    }
    
    deleteItem() {
        this.delete.emit("delete");
    } 
}
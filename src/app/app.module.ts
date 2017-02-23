import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChartJsPage } from '../pages/chart-js/chart-js';

import {StockList} from '../pages/stock-list/stock-list';

import {StockInfo} from '../providers/stock-info';

import {StockChart} from '../component/stock-chart/stock-chart';
import {StockCmp} from '../component/stock/stock';
import {StockDetailCmp} from '../component/stock-detail/stock-detail';

import {NumberStringPipe} from '../component/stock/pipe';

import {StockQuoteSearch} from '../pages/stock-quote-search/stock-quote-search';
import {StockDetail} from '../pages/stock-detail/stock-detail';

import {Storage} from '@ionic/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2ChartPage } from '../pages/ng2-chart/ng2-chart';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import {
  ChartistModule
} from 'angular2-chartist';

import {
  AsyncChartComponent,
  DynamicChartComponent,
  LiveChartComponent
} from '../component';

import {
  ChartistDemoPage
} from '../pages/chartist-demo/chartist-demo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	ChartJsPage,
	Ng2ChartPage,
	StockList,
	StockChart,
	StockCmp,
	StockDetailCmp,
	StockQuoteSearch,
	StockDetail,
	ChartistDemoPage,
    LiveChartComponent,
    AsyncChartComponent,
    DynamicChartComponent,
	NumberStringPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	FormsModule,
	ReactiveFormsModule,
	ChartsModule,
	ChartistModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	ChartJsPage,
	Ng2ChartPage,
	StockList,
	StockChart,
	StockCmp,
	StockDetailCmp,
	StockQuoteSearch,
	StockDetail,
	ChartistDemoPage,
    LiveChartComponent,
    AsyncChartComponent,
    DynamicChartComponent
  ],
  providers: [StockInfo, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

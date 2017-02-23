import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ChartJsPage } from '../pages/chart-js/chart-js';
import { Ng2ChartPage } from '../pages/ng2-chart/ng2-chart';
import {
  ChartistDemoPage
} from '../pages/chartist-demo/chartist-demo';

import { StockList } from '../pages/stock-list/stock-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
	  { title: 'Chart.js Page', component: ChartJsPage },
	  { title: 'Ng2 Chart Page', component: Ng2ChartPage },
	  { title: 'Chartist Page', component: ChartistDemoPage },
	  { title: 'Stock List Page', component: StockList }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.css']
})
export class TradingChartComponent implements OnInit {
  @ViewChild('chartContainer',{static:true}) chartContainer: ElementRef;
  chartRendered: boolean = false;
  
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadTradingViewScript();
  }

  loadTradingViewScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;

    script.onload = () => {
      this.initTradingViewWidget();
    };

    script.onerror = (error) => {
      console.error('Error loading TradingView script:', error);
    };

    this.chartContainer.nativeElement.appendChild(script);
  }

  initTradingViewWidget(): void {
    if (typeof window['TradingView'] === 'undefined') {
      console.error('TradingView object is undefined. Widget cannot be initialized.');
      return;
    }

    // Initialize TradingView widget
    new window['TradingView'].widget({
      "autosize": true,
      "symbol": "FX_IDC:USDINR",
      "interval": "1",
      "timezone": "Asia/Kolkata",
      "theme": "dark", // Set theme to dark
      "style": "1",
      "locale": "in",
      "enable_publishing": true,
      "withdateranges": true,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "calendar": false,
      "studies": [
        "STD;24h%Volume",
        "STD;Accumulation_Distribution"
      ],
      "show_popup_button": true,
      "popup_width": "1000",
      "popup_height": "650",
      "support_host": "https://www.tradingview.com",
      "container_id": "mychart",
      "onReady": () => {
        this.chartRendered = true;
      }
    });
  }
}

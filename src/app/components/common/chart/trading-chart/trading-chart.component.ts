import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trading-chart',
  template: `
    <div class="tradingview-widget-container" #chartContainer style="width: 100%; height: 90vh;"    >
      <div class="tradingview-widget-container__widget" id="tradingview-container">
        <div class="tradingview-widget-copyright">
          <div id="mychart"></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./trading-chart.component.css']
})
export class TradingChartComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.loadTradingViewScript();
  }

  loadTradingViewScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;

    script.onload = () => {
      this.initTradingViewWidget();
      this.resizeChart(); // Initial resize after the script has loaded
    };

    script.onerror = (error) => {
      console.error('Error loading TradingView script:', error);
    };

    this.renderer.appendChild(this.chartContainer.nativeElement, script);

    // Attach a listener for window resize events to handle dynamic resizing
    window.addEventListener('resize', () => this.resizeChart());
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
  "theme": "dark",
  "style": "1",
  "locale": "in",
  "enable_publishing": false,
  "withdateranges": true,
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "details": true,
  "calendar": false,
  "studies": [
    "STD;Accumulation_Distribution"
  ],
      "support_host": "https://www.tradingview.com",
      "container_id": "tradingview-container", // Set container_id to the specific container
      "onReady": () => {
        console.log('TradingView widget is ready.');
      }
    });
  }

  resizeChart(): void {
    const tradingviewWidget = window['TradingView'].widgets['tradingview-container'];

    if (tradingviewWidget) {
      tradingviewWidget.onChartReady(() => {
        tradingviewWidget.chart().resizeContainer(
          this.chartContainer.nativeElement.offsetWidth,
          this.chartContainer.nativeElement.offsetHeight
        );
      });
    }
  }
}

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, } from '@angular/core';
import Chart from 'chart.js/auto'

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  mode, fonts, colors
} from "../../../variables/charts";


@Component({
  selector: 'app-bar-chart-base',
  templateUrl: './bar-chart-base.component.html',
  styleUrls: ['./bar-chart-base.component.scss']
})
export class BarChartBaseComponent implements OnInit, OnChanges {
  @Input() public data: any;
  @Input() public title: string = 'Total Expenses';
  @Input() public subTitle: string = 'Accross all accounts';
  public chart: Chart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  constructor() { }

  ngOnInit(): void {
    parseOptions(Chart, chartOptions());
    // Chart.overrides.doughnut.cutout = 50
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: this.data,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && this.chart && this.chart.data) {
      this.chart.data = this.data;
      this.chart.update();
    }
  }
}

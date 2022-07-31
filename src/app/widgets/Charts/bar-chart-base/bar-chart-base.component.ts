import { Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";


@Component({
  selector: 'app-bar-chart-base',
  templateUrl: './bar-chart-base.component.html',
  styleUrls: ['./bar-chart-base.component.scss']
})
export class BarChartBaseComponent implements OnInit {
  @Input() public data: any;
  @Input() public title: string = 'Total Expenses';
  @Input() public subTitle: string = 'Accross all accounts';
  public chart: Chart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  constructor() { }

  ngOnInit(): void {
    // parseOptions(Chart, chartOptions());
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
  }
}

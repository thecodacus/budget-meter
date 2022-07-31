import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { chartExample1, chartOptions, parseOptions } from 'src/app/variables/charts';

@Component({
  selector: 'app-line-chart-base',
  templateUrl: './line-chart-base.component.html',
  styleUrls: ['./line-chart-base.component.scss']
})
export class LineChartBaseComponent implements OnInit {
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
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      options: chartExample1.options,
      data: this.data
    });
  }

}

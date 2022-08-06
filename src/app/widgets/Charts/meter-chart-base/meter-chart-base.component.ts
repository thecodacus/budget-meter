import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto'

// core components
import {
  chartOptions,
  colors,
  parseOptions
} from "../../../variables/charts";

@Component({
  selector: 'app-meter-chart-base',
  templateUrl: './meter-chart-base.component.html',
  styleUrls: ['./meter-chart-base.component.scss']
})
export class MeterChartBaseComponent implements OnInit, OnChanges {
  @Input() public data: any = null;
  @Input() public title: string = 'Total Expenses';
  @Input() public subTitle: string = 'Accross all accounts';
  public chart: Chart;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  constructor() { }

  ngOnInit(): void {
    parseOptions(Chart, chartOptions());
    Chart.defaults.datasets.doughnut = {
      ...Chart.defaults.datasets.doughnut,
      circumference: 180,
      rotation: -90,
      borderRadius: {
        "innerEnd": 50,
        "innerStart": 50,
        "outerEnd": 50,
        "outerStart": 50
      }
    }
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      data: this.data
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue && this.chart && this.chart.data) {
      this.chart.data = this.data;
      this.chart.update();
    }
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';

// core components
// import {
//   chartOptions,
//   parseOptions
// } from "../../../variables/charts";

@Component({
  selector: 'app-pie-chart-base',
  templateUrl: './pie-chart-base.component.html',
  styleUrls: ['./pie-chart-base.component.scss']
})
export class PieChartBaseComponent implements OnInit {
  @Input() public data: any = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4,

    }]
  };
  @Input() public title: string = 'Total Expenses';
  @Input() public subTitle: string = 'Accross all accounts';
  public chart: Chart;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  constructor() { }

  ngOnInit(): void {
    // parseOptions(Chart, chartOptions());
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      data: this.data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'TEST'
          }
        }
      }
    });
  }

}

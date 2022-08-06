import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss']
})
export class BaseCardComponent implements OnInit {
  @Input() title: string = 'Total Balance';
  @Input() value: number = 0;
  @Input() incriment: number = 0;
  @Input() subtext: string = 'Since last month';
  @Input() icon: string = 'fas fa-chart-bar';
  @Input() iconColor: string = 'danger';

  constructor() {

  }

  ngOnInit(): void {
  }

}

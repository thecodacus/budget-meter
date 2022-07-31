import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, map } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-total-income',
  templateUrl: './total-income.component.html',
  styleUrls: ['./total-income.component.scss']
})
export class TotalIncomeComponent implements OnInit {
  @Input() title: string = 'Total Income';
  icon: string = 'fas fa-rupee-sign';
  increment$: Observable<number>;
  subtext: string = 'Since last month';
  value$: Observable<number>;
  constructor(public store: StoreService) {
    this.value$ = this.store.getTotalIncome(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`), new Date());
    let lastMonthIncome$ = this.store.getTotalIncome(new Date(
      `${new Date().getFullYear()}-${new Date().getMonth()}-01`),
      new Date(`${new Date().getFullYear()}-${new Date().getMonth() - 1}-01`)
    );
    this.increment$ = lastMonthIncome$.pipe(switchMap(lastMonthIncome => {
      return this.value$.pipe(map(value => {
        return value - lastMonthIncome;
      }))
    }))
  }
  ngOnInit(): void {
  }
}

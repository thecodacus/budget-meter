import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-total-expenses',
  templateUrl: './total-expenses.component.html',
  styleUrls: ['./total-expenses.component.scss']
})
export class TotalExpensesComponent implements OnInit {
  @Input() title: string = 'Total Expenses';
  icon: string = 'ni ni-cart';
  increment$: Observable<number>;
  subtext: string = 'Since last month';
  value$: Observable<number>;
  constructor(public store: StoreService) {
  }

  ngOnInit(): void {
    this.value$ = this.store.getCurrentMonthTotalExpense();
    let lastMonthExpense$ = this.store.getTotalExpense(new Date(
      `${new Date().getFullYear()}-${new Date().getMonth()}-01`),
      new Date(`${new Date().getFullYear()}-${new Date().getMonth() - 1}-01`)
    );
    this.increment$ = lastMonthExpense$.pipe(switchMap(lastMonthExpense => {
      return this.value$.pipe(map(value => {
        return value - lastMonthExpense;
      }))
    }))
  }

}

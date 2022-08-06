import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap, map, combineLatest } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-total-savings',
  templateUrl: './total-savings.component.html',
  styleUrls: ['./total-savings.component.scss']
})
export class TotalSavingsComponent implements OnInit {
  @Input() title: string = 'Total Savings';
  icon: string = 'fas fa-piggy-bank';
  increment$: Observable<number>;
  subtext: string = 'Since last month';
  value$: Observable<number>;
  constructor(public store: StoreService) {
  }
  ngOnInit(): void {
    this.value$ = combineLatest([
      this.store.getTotalIncome(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`), new Date()),
      this.store.getTotalExpense(new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`), new Date())]
    ).pipe(map(([income, expense]) => {
      return income - expense;
    }))

    let lastMonthIncome$ = this.store.getTotalIncome(new Date(
      `${new Date().getFullYear()}-${new Date().getMonth()}-01`),
      new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`)
    );
    let lastMonthExpense$ = this.store.getTotalExpense(new Date(
      `${new Date().getFullYear()}-${new Date().getMonth()}-01`),
      new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`)
    );
    this.increment$ = combineLatest([lastMonthIncome$, lastMonthExpense$])
      .pipe(switchMap(([lastMonthIncome, lastMonthExpense]) => {
        return this.value$.pipe(map(value => {
          return value - lastMonthIncome + lastMonthExpense;
        }))
      }))
  }
}

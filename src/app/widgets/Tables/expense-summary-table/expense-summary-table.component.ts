import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StoreService, TransactionCategory } from 'src/app/services/store.service';

@Component({
  selector: 'app-expense-summary-table',
  templateUrl: './expense-summary-table.component.html',
  styleUrls: ['./expense-summary-table.component.scss']
})
export class ExpenseSummaryTableComponent implements OnInit {
  expensesByCategories$: Observable<{ category: string, amount: number, ratio: number }[]>
  constructor(private store: StoreService) {
  }

  ngOnInit(): void {
    this.expensesByCategories$ = this.store.getCurrentMonthExpenses()
      .pipe(map(expenses => {
        let result: { category: string, amount: number, ratio: number }[] = []
        let categories = this.store.getTransactionCategories();
        let total = 0;
        categories.forEach(category => {
          let catId = TransactionCategory[category];
          let amount = expenses.filter(e => e.category == catId).map(e => e.amount).reduce((a, v) => a + v, 0)
          result.push({ category, amount, ratio: 0 })
          total += amount;
        })
        result = result.filter(x => x.amount > 0).map(x => {
          return { ...x, ratio: x.amount * 100 / total }
        })
        return result
      }))
  }

}

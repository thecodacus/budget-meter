import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITransaction, StoreService, TransactionType } from 'src/app/services/store.service';

@Component({
  selector: 'app-bar-chart-expenses',
  templateUrl: './bar-chart-expenses.component.html',
  styleUrls: ['./bar-chart-expenses.component.scss']
})
export class BarChartExpensesComponent implements OnInit {
  expenses$: Observable<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      maxBarThickness: number;
    }[];
  }>;
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    let lastSixMonthNames: string[] = [];
    for (let i = 0; i < 6; i++) {
      lastSixMonthNames.push(new Date(new Date().getFullYear(), new Date().getMonth() + i - 5, 1).toLocaleDateString('en-US', { month: 'short' }));
    }
    // get last 6 month expenses
    this.expenses$ = this.store.getTransactionsByType(
      TransactionType.EXPENSE,
      new Date(`${new Date().getFullYear()}-${new Date().getMonth() - 5}-01`), new Date()
    )
      .pipe(map((expenses: ITransaction[]) => {
        let expensesByMonth: number[] = [];
        for (let i = 0; i < 6; i++) {
          expensesByMonth.push(0);
        }
        expenses.forEach(expense => {
          let expenseMonth = new Date((expense.date as any).toDate()).getMonth() - new Date(Date.now()).getMonth() + 5;
          expensesByMonth[expenseMonth] += expense.amount;
        }
        );
        return {
          labels: lastSixMonthNames,
          datasets: [{
            label: 'Expenses',
            data: expensesByMonth,
            maxBarThickness: 10
          }]
        }
      }))

  }

}

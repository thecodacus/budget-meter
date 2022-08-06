import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { colors } from 'src/app/variables/charts';

@Component({
  selector: 'app-meter-chart-budget',
  templateUrl: './meter-chart-budget.component.html',
  styleUrls: ['./meter-chart-budget.component.scss']
})
export class MeterChartBudgetComponent implements OnInit {
  public chartData$: Observable<{
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string[],
      hoverOffset: number
    }[]
  }>
  public budgetData$: Observable<{ spent: number, balance: number, overSpent: number }>
  constructor(private store: StoreService) {

  }

  ngOnInit(): void {
    this.budgetData$ = this.store.getCurrentMonthBudget()
      .pipe(map(budget => {
        let balance = budget.budget - budget.expense;
        let spent = budget.expense;
        let overSpent = 0
        if (balance < 0) {
          balance = 0;
          spent = budget.budget;
          overSpent = budget.expense - budget.budget
        }
        return {
          spent,
          balance,
          overSpent
        }
      }
      )
      )
    this.chartData$ = this.budgetData$.pipe(
      map(budget => {
        let data = {
          labels: ['Spent', 'Safe to spend'],
          datasets: [{
            label: 'Budget',
            data: [budget.spent, budget.balance],
            backgroundColor: [
              colors.theme.warning,
              colors.theme.success
            ],
            hoverOffset: 4
          }]
        }
        // if(budget.overSpent>0){
        //   data.datasets.push({
        //     label: 'OverSpent',
        //     data: [budget.overSpent, budget.spent-budget.overSpent],
        //     backgroundColor: [
        //       '#993333',
        //       'rgba(0,0,0,0)'
        //     ],
        //     hoverOffset: 4
        //   })
        // }
        return data
      })
    )
  }


}

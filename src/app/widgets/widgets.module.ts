import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalBalanceComponent } from './Cards/total-balance/total-balance.component';
import { BaseCardComponent } from './Cards/base-card/base-card.component';
import { TotalIncomeComponent } from './Cards/total-income/total-income.component';
import { TotalExpensesComponent } from './Cards/total-expenses/total-expenses.component';
import { TotalSavingsComponent } from './Cards/total-savings/total-savings.component';
import { BarChartBaseComponent } from './Charts/bar-chart-base/bar-chart-base.component';
import { BarChartExpensesComponent } from './Charts/bar-chart-expenses/bar-chart-expenses.component';



@NgModule({
  declarations: [
    TotalBalanceComponent,
    BaseCardComponent,
    TotalIncomeComponent,
    TotalExpensesComponent,
    TotalSavingsComponent,
    BarChartBaseComponent,
    BarChartExpensesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TotalBalanceComponent,
    BaseCardComponent,
    TotalIncomeComponent,
    TotalExpensesComponent,
    TotalSavingsComponent,
    BarChartBaseComponent
  ]
})
export class WidgetsModule { }

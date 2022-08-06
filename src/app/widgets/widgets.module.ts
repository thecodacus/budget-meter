import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TotalBalanceComponent } from './Cards/total-balance/total-balance.component';
import { BaseCardComponent } from './Cards/base-card/base-card.component';
import { TotalIncomeComponent } from './Cards/total-income/total-income.component';
import { TotalExpensesComponent } from './Cards/total-expenses/total-expenses.component';
import { BarChartBaseComponent } from './Charts/bar-chart-base/bar-chart-base.component';
import { BarChartExpensesComponent } from './Charts/bar-chart-expenses/bar-chart-expenses.component';
import { LineChartBaseComponent } from './Charts/line-chart-base/line-chart-base.component';
import { LineChartSavingsComponent } from './Charts/line-chart-savings/line-chart-savings.component';
import { MeterChartBaseComponent } from './Charts/meter-chart-base/meter-chart-base.component';
import { TotalSavingsComponent } from './Cards/total-savings/total-savings.component';
import { MeterChartBudgetComponent } from './Charts/meter-chart-budget/meter-chart-budget.component';
import { AddTransactionsComponent } from './Popups/add-transactions/add-transactions.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalBaseComponent } from './Popups/modal-base/modal-base.component';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransactionsTableComponent } from './Tables/transactions/transactions-table.component';
import { ExpenseSummaryTableComponent } from './Tables/expense-summary-table/expense-summary-table.component';
import { ModalSetBudgetComponent } from './Popups/modal-set-budget/modal-set-budget.component';
import { ModalAddAccountComponent } from './Popups/modal-add-account/modal-add-account.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TotalBalanceComponent,
    BaseCardComponent,
    TotalIncomeComponent,
    TotalExpensesComponent,
    BarChartBaseComponent,
    BarChartExpensesComponent,
    LineChartBaseComponent,
    LineChartSavingsComponent,
    MeterChartBaseComponent,
    TotalSavingsComponent,
    MeterChartBudgetComponent,
    AddTransactionsComponent,
    ModalBaseComponent,
    TransactionsTableComponent,
    ExpenseSummaryTableComponent,
    ModalSetBudgetComponent,
    ModalAddAccountComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TotalBalanceComponent,
    BaseCardComponent,
    TotalIncomeComponent,
    TotalExpensesComponent,
    BarChartBaseComponent,
    BarChartExpensesComponent,
    LineChartBaseComponent,
    MeterChartBaseComponent,
    TotalSavingsComponent,
    MeterChartBudgetComponent,
    AddTransactionsComponent,
    ModalBaseComponent,
    TransactionsTableComponent,
    ExpenseSummaryTableComponent,
    ModalSetBudgetComponent,
    ModalAddAccountComponent
  ]
})
export class WidgetsModule { }

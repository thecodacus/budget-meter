import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ITransaction, StoreService, TransactionCategory, TransactionType } from 'src/app/services/store.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  transactions$: Observable<{ counterparty: string, type: string, category: string, amount: number }[]>
  constructor(private store: StoreService) {
  }
  ngOnInit(): void {
    let today = new Date(Date.now())
    let startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    this.transactions$ = combineLatest([this.store.getCounterParties(), this.store.getTransactions(startDate, today)])
      .pipe(map(([counterParties, items]) => {
        return items.map(item => {
          return {
            counterparty: counterParties.find(i => i.id == item.counterpartyId)?.name || 'Unknown',
            type: this.getType(item.type),
            category: this.getCategory(item.category),
            amount: item.amount
          }
        })
      }))
  }
  getType(type: TransactionType): string {
    return this.store.getTransactionTypes().find(x => TransactionType[x] == type)
  }
  getCategory(category: TransactionCategory): string {
    return this.store.getTransactionCategories().find(x => TransactionCategory[x] == category)
  }


}

import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { StoreService, TransactionCategory, TransactionType } from 'src/app/services/store.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<{ id: string, counterparty: string, type: string, category: string, amount: number }[]>
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    let today = new Date(Date.now())
    let startDate = new Date(today.getFullYear(), today.getMonth(), 1)
    this.transactions$ = combineLatest([this.store.getCounterParties(), this.store.getTransactions(startDate, today)])
      .pipe(map(([counterParties, items]) => {
        return items.map(item => {
          return {
            id: item.id,
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
  async deleteTransaction(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await this.store.deleteTransaction(id)
  }

}

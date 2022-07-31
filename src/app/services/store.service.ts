import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';


export enum TransactionCategory {
  GROCERY,
  FOOD,
  ENTERTAINMENT,
  TRANSPORT,
  SHOPPING,
  RENT,
  EMI,
  OTHER,
  SALARY,
}
export enum TransactionType {
  INCOME,
  EXPENSE
}
export interface ITransaction {
  id: number;
  amount: number;
  date: Date;
  type: TransactionType;
  category?: TransactionCategory;
  description: string;
  accountId: {
    id: number;
    name: string;
  }
  externalId: {
    id: number;
    name: string;
  }
}
export interface IExternalEntity {
  id: number;
  name: string;
}
export interface IAccount {
  type: "Bank" | "Wallet",
  id: number;
  name: string;
  balance: number;
}
export interface IStore {
  Accounts: IAccount[],
  Transactions: ITransaction[],
  Budget: {
    monthly: number,
  },
  Payees: IExternalEntity[]
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: IStore = {
    Accounts: [],
    Transactions: [],
    Budget: {
      monthly: 0
    },
    Payees: []
  }
  private store$: BehaviorSubject<IStore>;
  constructor() {
    this.store$ = new BehaviorSubject(this.store);
  }
  setStore(store: IStore) {
    this.store = store;
    this.store$.next(this.store);
  }
  getStore(): Observable<IStore> {
    return this.store$.asObservable();
  }
  getAccounts(): Observable<IAccount[]> {
    return this.store$.pipe(
      map(store => store.Accounts)
    );
  }
  getTransactions(startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.date >= startDate && transaction.date <= endDate))
    );
  }
  getBudget(): Observable<IStore["Budget"]> {
    return this.store$.pipe(
      map(store => store.Budget)
    );
  }
  getPayees(): Observable<IExternalEntity[]> {
    return this.store$.pipe(
      map(store => store.Payees)
    );
  }
  getAccount(id: number): Observable<IAccount> {
    return this.store$.pipe(
      map(store => store.Accounts.find(account => account.id === id))
    );
  }
  getTransaction(id: number): Observable<ITransaction> {
    return this.store$.pipe(
      map(store => store.Transactions
        .find(transaction => transaction.id === id))
    );
  }
  getPayee(id: number): Observable<IExternalEntity> {
    return this.store$.pipe(
      map(store => store.Payees
        .find(payee => payee.id === id))
    );
  }
  getTransactionsByAccount(accountId: number, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.accountId.id === accountId && transaction.date >= startDate && transaction.date <= endDate))
    );
  }
  getTransactionsByPayee(payeeId: number, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.externalId.id === payeeId && transaction.date >= startDate && transaction.date <= endDate))
    );
  }
  getTransactionsByType(type: TransactionType, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.type === type && transaction.date >= startDate && transaction.date <= endDate))
    );
  }
  getTransactionsByCategory(expenceType: TransactionCategory, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.category === expenceType && transaction.date >= startDate && transaction.date <= endDate))
    );
  }
  // adding operations
  addAccount(account: IAccount) {
    this.store.Accounts.push(account);
    this.store$.next(this.store);
  }
  addTransaction(transaction: ITransaction) {
    this.store.Transactions.push(transaction);
    this.store$.next(this.store);
  }
  addPayee(payee: IExternalEntity) {
    this.store.Payees.push(payee);
    this.store$.next(this.store);
  }
  // updating operations
  updateAccount(account: IAccount) {
    const index = this.store.Accounts.findIndex(acc => acc.id === account.id);
    this.store.Accounts[index] = account;
    this.store$.next(this.store);
  }
  updateTransaction(transaction: ITransaction) {
    const index = this.store.Transactions.findIndex(tran => tran.id === transaction.id
    );
    this._revertTransaction(transaction.id)
    this.store.Transactions[index] = transaction;
    this.store$.next(this.store);
  }
  updatePayee(payee: IExternalEntity) {
    const index = this.store.Payees.findIndex(pay => pay.id === payee.id);
    this.store.Payees[index] = payee;
    this.store$.next(this.store);
  }
  // deleting operations
  deleteAccount(accountId: number) {
    const index = this.store.Accounts.findIndex(acc => acc.id === accountId);
    this.store.Accounts.splice(index, 1);
    this.store$.next(this.store);
  }
  deleteTransaction(transactionId: number) {
    const index = this.store.Transactions.findIndex(tran => tran.id === transactionId);
    this._revertTransaction(transactionId)
    this.store.Transactions.splice(index, 1);
    this.store$.next(this.store);
  }
  deletePayee(payeeId: number) {
    const index = this.store.Payees.findIndex(pay => pay.id === payeeId);
    this.store.Payees.splice(index, 1);
    this.store$.next(this.store);
  }

  // other operations
  getTotalBalance(): Observable<number> {
    return this.store$.pipe(
      map(store => store.Accounts.reduce((acc, account) => acc + account.balance, 0))
    );
  }
  getTotalExpence(startDate: Date, endDate: Date): Observable<number> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.date >= startDate && transaction.date <= endDate)
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }
  getTotalIncome(startDate: Date, endDate: Date): Observable<number> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.date >= startDate && transaction.date <= endDate)
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }
  getTotalExpenceByCategory(type: TransactionCategory, startDate: Date, endDate: Date): Observable<number> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.date >= startDate && transaction.date <= endDate && transaction.category === type && transaction.type === TransactionType.EXPENSE)
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }
  getTotalIncomeByCategory(type: TransactionCategory, startDate: Date, endDate: Date): Observable<number> {
    return this.store$.pipe(
      map(store => store.Transactions
        .filter(transaction => transaction.date >= startDate && transaction.date <= endDate && transaction.category === type && transaction.type === TransactionType.INCOME)
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }

  // private methods
  private _revertTransaction(transactionId: number) {
    const transaction = this.store.Transactions
      .find(transaction => transaction.id === transactionId);

    let account = this.store.Accounts.find(account => account.id === transaction.accountId.id)
    if (transaction.type === TransactionType.INCOME) {
      account.balance -= transaction.amount;
    }
    else {
      account.balance += transaction.amount;
    }
  }

}

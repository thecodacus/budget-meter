import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, firstValueFrom, map, Observable, ReplaySubject, Subject, switchMap } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore'
import { idToken, User } from '@angular/fire/auth';
import { increment } from "firebase/firestore";
import { AuthService } from './auth.service';

export enum TransactionCategory {
  GROCERY = 'GROCERY',
  FOOD = 'FOOD',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TRANSPORT = 'TRANSPORT',
  SHOPPING = 'SHOPPING',
  RENT = 'RENT',
  EMI = 'EMI',
  OTHER = 'OTHER',
  SALARY = 'SALARY',
}
export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum PaymentMode {
  CASH = 'CASH',
  CREDITCARD = 'CREDITCARD',
  NETBANKING = 'NETBANKING',
  UPI = 'UPI',
  DIGITALWALLET = 'DIGITALWALLET',
  OTHER = 'OTHER',
}
export interface ITransaction {
  id?: string;
  amount: number;
  date: Date;
  type: TransactionType;
  category?: TransactionCategory;
  paymentMode?: PaymentMode;
  description?: string;
  accountId: string;
  counterpartyId: string;
}
export interface ICounterPartyEntity {
  id?: string;
  name: string;
}
export interface IAccount {
  type: "Bank" | "Wallet",
  id?: string;
  name: string;
  balance: number;
  lastCorrected?: Date;
  last4Digits?: number;
  Address?: {
    address: string,
    city: string,
    country: string,
    postalCode: number
  }
}
export interface IStore {
  Accounts: IAccount[],
  Transactions: ITransaction[],
  Budget: {
    monthly: number,
  },
  CounterParties: ICounterPartyEntity[]
}
export enum StoreConstants {
  DBCOLLECTION = 'expense-tracker',
  ACCOUNTS = 'Accounts',
  TRANSACTIONS = 'Transactions',
  COUNTERPARTIES = 'CounterParties',
  BUDGET = 'Budget'
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private storeId$: ReplaySubject<string>
  constructor(private db: AngularFirestore) {
    this.storeId$ = new ReplaySubject(1);
    // this.auth.getCurrentUser()
    //   .then(user => {
    //     if (user) this.setStore(user)
    //   })
  }
  async setStore(userID: string) {
    let userId = userID;
    let query = await this.db.collection<{ userId: string, budget: { monthly } }>(StoreConstants.DBCOLLECTION).ref.where('userId', '==', userId).get()
    if (query.docs.length == 0) {
      let collection = this.db.collection<{ userId: string, budget: { monthly } }>(StoreConstants.DBCOLLECTION)
      let doc = await collection.add({
        userId,
        budget: {
          monthly: 0
        }
      })
      this.storeId$.next(doc.id)
      await this.addAccount({
        name: 'Wallet',
        balance: 0,
        type: "Wallet"
      })
    }
    else {
      this.storeId$.next(query.docs[0].id)
    }
    // this.store$.next(this.store);
  }
  createNewId() {
    return this.db.createId()
  }
  getStore(): Observable<string> {
    return this.storeId$.asObservable()
  }
  getAccounts(): Observable<IAccount[]> {
    return this.getStore().pipe(switchMap(id => this.db.collection(StoreConstants.DBCOLLECTION)
      .doc(id)
      .collection<IAccount>(StoreConstants.ACCOUNTS)
      .valueChanges()))
  }
  getTransactions(startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.getStore().pipe(switchMap(id => this.db.collection(StoreConstants.DBCOLLECTION)
      .doc(id)
      .collection<ITransaction>(StoreConstants.TRANSACTIONS, ref => ref.where('date', ">=", startDate).where('date', "<=", endDate))
      .valueChanges()))
  }
  getBudget(): Observable<IStore["Budget"]> {
    return this.getStore().pipe(switchMap(id => this.db.collection(StoreConstants.DBCOLLECTION)
      .doc<{ userId: string, budget: { monthly } }>(id)
      .valueChanges().pipe(
        map(x => {
          return {
            ...x.budget
          }
        })
      )))
  }
  getCounterParties(): Observable<ICounterPartyEntity[]> {
    return this.getStore().pipe(
      switchMap(id => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(id)
        .collection<ICounterPartyEntity>(StoreConstants.COUNTERPARTIES)
        .valueChanges()))
  }
  getAccount(id: string): Observable<IAccount> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<IAccount>(StoreConstants.ACCOUNTS)
        .doc(id)
        .valueChanges()))
  }
  getTransaction(id: string): Observable<ITransaction> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS)
        .doc(id)
        .valueChanges()))
  }
  getCaunterParty(id: string): Observable<ICounterPartyEntity> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ICounterPartyEntity>(StoreConstants.COUNTERPARTIES)
        .doc(id)
        .valueChanges()))
  }
  getTransactionsByAccount(accountId: string, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS,
          ref => ref.where('accountId', '==', accountId)
            .where('date', '>=', startDate)
            .where('date', "<=", endDate)
        ).valueChanges()))
  }
  getTransactionsByCounterparty(counterpartyId: string, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS,
          ref => ref.where('counterpartyId', '==', counterpartyId)
            .where('date', '>=', startDate)
            .where('date', "<=", endDate)
        ).valueChanges()))
  }
  getTransactionsByType(type: TransactionType, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS,
          ref => ref.where('type', '==', type)
            .where('date', '>=', startDate)
            .where('date', "<=", endDate)
        ).valueChanges()))
  }
  getTransactionsByCategory(expenseType: TransactionCategory, startDate: Date, endDate: Date): Observable<ITransaction[]> {
    return this.getStore().pipe(
      switchMap(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS,
          ref => ref.where('category', '==', expenseType)
            .where('date', '>=', startDate)
            .where('date', "<=", endDate)
        ).valueChanges()))
  }
  // adding operations
  async addAccount(account: IAccount) {
    return firstValueFrom(this.getStore())
      .then(storeId => {
        let newDoc = this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .collection<IAccount>(StoreConstants.ACCOUNTS).doc()
        return newDoc.set({
          ...account,
          id: newDoc.ref.id
        })

      })
    // this.setStore(this.store);
  }
  async addTransaction(transaction: ITransaction) {
    await firstValueFrom(this.getStore())
      .then(storeId => {
        let newDoc = this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .collection<ITransaction>(StoreConstants.TRANSACTIONS).doc()
        return newDoc.set({
          ...transaction,
          id: newDoc.ref.id
        })
      })

    await this._performTransaction(transaction);
    // this.setStore(this.store);
  }
  async addCounterParty(data: ICounterPartyEntity) {
    return firstValueFrom(this.getStore())
      .then(storeId => {
        let newDoc = this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .collection<ICounterPartyEntity>(StoreConstants.COUNTERPARTIES).doc()
        return newDoc.set({
          ...data,
          id: newDoc.ref.id
        })
      })
    // this.setStore(this.store);
  }

  // updating operations
  async updateBudget(budget: IStore["Budget"]) {
    return firstValueFrom(this.getStore())
      .then(storeId => {
        return this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .update({
            budget
          })
      })
  }
  async updateAccount(account: IAccount) {
    return firstValueFrom(this.getStore())
      .then(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<IAccount>(StoreConstants.ACCOUNTS)
        .doc(account.id)
        .set(account))
    // this.setStore(this.store);
  }

  async updateTransaction(transaction: ITransaction) {
    await this._revertTransaction(transaction.id)
    await this._performTransaction(transaction);
    return firstValueFrom(this.getStore())
      .then(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS)
        .doc(transaction.id)
        .set(transaction))

    // this.setStore(this.store);
  }
  async updateCounterParty(counterparty: ICounterPartyEntity) {
    return firstValueFrom(this.getStore())
      .then(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ICounterPartyEntity>(StoreConstants.COUNTERPARTIES)
        .doc(counterparty.id)
        .set(counterparty))
  }
  // deleting operations
  async deleteAccount(accountId: string) {
    return firstValueFrom(this.getStore())
      .then(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<IAccount>(StoreConstants.ACCOUNTS)
        .doc(accountId).delete())
    // this.setStore(this.store);
  }
  async deleteTransaction(transactionId: string) {
    await this._revertTransaction(transactionId)
    return firstValueFrom(this.getStore())
      .then(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ITransaction>(StoreConstants.TRANSACTIONS)
        .doc(transactionId).delete())
    // this.setStore(this.store);
  }
  async deleteCounterParty(cointerpartyId: string) {
    return firstValueFrom(this.getStore())
      .then(storeId => this.db.collection(StoreConstants.DBCOLLECTION)
        .doc(storeId)
        .collection<ICounterPartyEntity>(StoreConstants.COUNTERPARTIES)
        .doc(cointerpartyId).delete())
    // this.setStore(this.store);
  }

  // other operations
  getTotalBalance(): Observable<number> {
    return this.getAccounts().pipe(
      map(accounts => accounts.reduce((acc, account) => acc + account.balance, 0))
    );
  }
  getTotalExpense(startDate: Date, endDate: Date): Observable<number> {
    return this.getTransactionsByType(TransactionType.EXPENSE, startDate, endDate).pipe(
      map(transactions => transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }
  getTotalIncome(startDate: Date, endDate: Date): Observable<number> {
    return this.getTransactionsByType(TransactionType.INCOME, startDate, endDate).pipe(
      map(transactions => transactions
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }
  getTotalExpenseByCategory(category: TransactionCategory, startDate: Date, endDate: Date): Observable<number> {
    return this.getTransactionsByCategory(category, startDate, endDate).pipe(
      map(transactions => transactions
        .filter(x => x.type == TransactionType.EXPENSE)
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }
  getTotalIncomeByCategory(category: TransactionCategory, startDate: Date, endDate: Date): Observable<number> {
    return this.getTransactionsByCategory(category, startDate, endDate).pipe(
      map(transactions => transactions
        .filter(x => x.type == TransactionType.INCOME)
        .reduce((acc, transaction) => acc + transaction.amount, 0))
    );
  }

  getTransactionCategories() {
    return Object.keys(TransactionCategory).filter(x => isNaN(Number(TransactionCategory[x])))
  }
  getTransactionTypes() {
    return Object.keys(TransactionType).filter(x => isNaN(Number(TransactionType[x])))
  }
  getPaymentModes() {
    return Object.keys(PaymentMode).filter(x => isNaN(Number(PaymentMode[x])))
  }

  //current month operations
  getCurrentMonthTotalExpense(): Observable<number> {
    return this.getTotalExpense(new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date());
  }
  getCurrentMonthIncome(): Observable<number> {
    return this.getTotalIncome(new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date());
  }
  getCurrentMonthBudget(): Observable<{ budget: number, expense: number }> {
    return combineLatest([this.getBudget(), this.getCurrentMonthTotalExpense()]).pipe(
      map(([budget, expense]) => ({ budget: budget.monthly, expense: expense }))
    );
  }
  getCurrentMonthExpenses(): Observable<ITransaction[]> {
    return this.getTransactionsByType(TransactionType.EXPENSE, new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date());
  }

  // private methods
  private async _revertTransaction(transactionId: string) {
    return await firstValueFrom(this.getStore())
      .then(async storeId => {
        let transactionObj = await firstValueFrom(this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .collection<ITransaction>(StoreConstants.TRANSACTIONS)
          .doc<ITransaction>(transactionId).get())

        let transaction = transactionObj.data();
        let amount = transaction.amount * -1;
        if (transaction.type == TransactionType.EXPENSE) amount = transaction.amount;
        return await this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .collection<IAccount>(StoreConstants.ACCOUNTS)
          .doc<IAccount>(transaction.accountId).ref.update({
            balance: increment(amount)
          })
      })
  }
  private async _performTransaction(transaction: ITransaction) {
    return await firstValueFrom(this.getStore())
      .then(async storeId => {
        let amount = transaction.amount
        if (transaction.type == TransactionType.EXPENSE) amount = transaction.amount * -1
        return await this.db.collection(StoreConstants.DBCOLLECTION)
          .doc(storeId)
          .collection<IAccount>(StoreConstants.ACCOUNTS)
          .doc<IAccount>(transaction.accountId).ref.update({
            balance: increment(amount)
          })
      })
  }

}

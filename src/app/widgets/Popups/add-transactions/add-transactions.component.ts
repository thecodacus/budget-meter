import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOverlayRef } from 'src/app/lib/modal-overlay';
import { DialogService } from 'src/app/services/dialog.service';
import { IAccount, ICounterPartyEntity, StoreService, TransactionCategory, TransactionType } from 'src/app/services/store.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-transactions',
  templateUrl: './add-transactions.component.html',
  styleUrls: ['./add-transactions.component.scss']
})
export class AddTransactionsComponent implements OnInit {
  modalRef: ModalOverlayRef
  transactionCategories: string[] = [];
  transactionTypes: string[] = [];
  accounts$: Observable<IAccount[]>;
  counterParties$: Observable<ICounterPartyEntity[]>;
  paymentModes: string[] = [];

  constructor(private dialog: DialogService, private store: StoreService) {

  }
  ngOnInit(): void {
    this.transactionCategories = this.store.getTransactionCategories();
    this.transactionTypes = this.store.getTransactionTypes();
    this.paymentModes = this.store.getPaymentModes();
    this.accounts$ = this.store.getAccounts()
    this.counterParties$ = this.store.getCounterParties()
    console.log(this.transactionCategories);
  }
  openWithTemplate(tpl: TemplateRef<any>) {
    this.modalRef = this.dialog.open(tpl, null)
  }

  close() {
    if (this.modalRef) this.modalRef.close()
  }
  dateToggle(d: any) {
    d.toggle()
  }
  async onSubmit(f: NgForm, success: TemplateRef<any>) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    if (f.valid) {
      await this.store.addTransaction({
        ...f.value,
        date: new Date(`${f.value.date.year}-${f.value.date.month}-${f.value.date.day}`),
        accountId: f.value.accountId,
        counterpartyId: f.value.counterpartyId,
        type: TransactionType[f.value.type],
        category: TransactionCategory[f.value.category]
      })
      this.close()
      this.modalRef = this.dialog.open(success, null)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { IAccount, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-account-single',
  templateUrl: './account-single.component.html',
  styleUrls: ['./account-single.component.scss']
})
export class AccountSingleComponent implements OnInit {
  account$: Observable<IAccount>
  accountForm: FormGroup;
  constructor(private route: ActivatedRoute, private store: StoreService, private formBuilder: FormBuilder) {
    this.account$ = this.route.params.pipe(switchMap(params => {
      console.log(params);
      return this.store.getAccount(params.id)
    }))
  }

  ngOnInit(): void {
  }
  createForm() {
    this.accountForm = this.formBuilder.group({
      name: [],
      last4Digit: []

    })
  }
  async onSubmit(form: NgForm, oldAccountData: IAccount) {
    console.log(form.value);
    console.log("valid:", form.valid);
    let account: IAccount = {
      ...oldAccountData,
      name: form.value.name,
      type: "Bank",
      last4Digits: form.value.last4Digits,
      balance: form.value.balance,
      Address: {
        ...oldAccountData.Address,
        address: form.value.address,
        city: form.value.city,
        country: form.value.country,
        postalCode: form.value.postalCode
      }
    }
    console.log(account);
    await this.store.updateAccount(account);
  }

}

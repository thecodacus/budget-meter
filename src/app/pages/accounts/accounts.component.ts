import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts$: Observable<IAccount[]>
  constructor(private store: StoreService) {
    this.accounts$ = this.store.getAccounts();
  }

  ngOnInit(): void {
  }
  async deleteAccount(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await this.store.deleteAccount(id)
  }

}

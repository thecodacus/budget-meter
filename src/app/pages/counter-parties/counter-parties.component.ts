import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICounterPartyEntity, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-counter-parties',
  templateUrl: './counter-parties.component.html',
  styleUrls: ['./counter-parties.component.scss']
})
export class CounterPartiesComponent implements OnInit {
  counterparties$: Observable<ICounterPartyEntity[]>
  constructor(private store: StoreService) { }

  ngOnInit(): void {
    this.counterparties$ = this.store.getAccounts();
  }
  async deleteAccount(e: MouseEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    await this.store.deleteAccount(id)
  }

}

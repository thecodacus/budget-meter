import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-total-balance',
  templateUrl: './total-balance.component.html',
  styleUrls: ['./total-balance.component.scss']
})
export class TotalBalanceComponent implements OnInit {
  @Input() title: string = 'Total Balance';
  @Input() subtext: string = 'Accross all accounts';
  icon: string = 'fas fa-chart-pie';
  value$: Observable<number>
  constructor(public store: StoreService) { }

  ngOnInit(): void {
    this.value$ = this.store.getTotalBalance();
  }

}

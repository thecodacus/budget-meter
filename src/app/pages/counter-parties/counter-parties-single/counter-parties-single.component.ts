import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICounterPartyEntity, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-counter-parties-single',
  templateUrl: './counter-parties-single.component.html',
  styleUrls: ['./counter-parties-single.component.scss']
})
export class CounterPartiesSingleComponent implements OnInit {

  constructor(private store: StoreService) {

  }

  ngOnInit(): void {
  }


}

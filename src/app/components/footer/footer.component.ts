import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  test: Date = new Date();

  constructor() { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}

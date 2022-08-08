import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  sticky: boolean = false;
  constructor() { }

  ngOnInit() {
    document.addEventListener('scroll', () => {
      this.keepTrack();
    })
  }
  keepTrack() {
    let scrollValue = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollValue > 90) {
      this.sticky = true;
    }
    else {
      this.sticky = false;
    }

  }

}

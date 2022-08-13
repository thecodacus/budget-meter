import { Component, OnInit } from '@angular/core';
import { SmsTrackerService } from 'src/app/services/sms-tracker.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  smsString: string;
  constructor(private sms: SmsTrackerService) {
  }

  async ngOnInit() {
    this.smsString = JSON.stringify(await this.sms.SyncSms())
  }


  public updateOptions() {

  }

}

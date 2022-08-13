import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SmsReader } from 'capacitor-sms-reader'

@Injectable({
  providedIn: 'root'
})
export class SmsTrackerService {
  private isNative: boolean;
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.SyncSms()
  }
  async SyncSms() {
    let result = await SmsReader.readSms({ count: 100 });
    // console.log(result);
    return result;
  }
}

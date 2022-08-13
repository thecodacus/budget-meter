import { TestBed } from '@angular/core/testing';

import { SmsTrackerService } from './sms-tracker.service';

describe('SmsTrackerService', () => {
  let service: SmsTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

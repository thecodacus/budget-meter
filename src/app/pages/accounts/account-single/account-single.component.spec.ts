import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSingleComponent } from './account-single.component';

describe('AccountSingleComponent', () => {
  let component: AccountSingleComponent;
  let fixture: ComponentFixture<AccountSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

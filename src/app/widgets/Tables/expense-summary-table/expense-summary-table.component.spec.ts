import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSummaryTableComponent } from './expense-summary-table.component';

describe('ExpenseSummaryTableComponent', () => {
  let component: ExpenseSummaryTableComponent;
  let fixture: ComponentFixture<ExpenseSummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseSummaryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

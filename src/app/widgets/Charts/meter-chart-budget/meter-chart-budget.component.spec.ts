import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterChartBudgetComponent } from './meter-chart-budget.component';

describe('MeterChartBudgetComponent', () => {
  let component: MeterChartBudgetComponent;
  let fixture: ComponentFixture<MeterChartBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterChartBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterChartBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

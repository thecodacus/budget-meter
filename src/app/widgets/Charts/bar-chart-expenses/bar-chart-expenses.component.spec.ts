import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartExpensesComponent } from './bar-chart-expenses.component';

describe('BarChartExpensesComponent', () => {
  let component: BarChartExpensesComponent;
  let fixture: ComponentFixture<BarChartExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

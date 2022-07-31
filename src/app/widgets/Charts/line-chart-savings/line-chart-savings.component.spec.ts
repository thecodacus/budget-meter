import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartSavingsComponent } from './line-chart-savings.component';

describe('LineChartSavingsComponent', () => {
  let component: LineChartSavingsComponent;
  let fixture: ComponentFixture<LineChartSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartSavingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

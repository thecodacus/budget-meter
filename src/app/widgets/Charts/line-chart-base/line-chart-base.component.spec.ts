import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartBaseComponent } from './line-chart-base.component';

describe('LineChartBaseComponent', () => {
  let component: LineChartBaseComponent;
  let fixture: ComponentFixture<LineChartBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

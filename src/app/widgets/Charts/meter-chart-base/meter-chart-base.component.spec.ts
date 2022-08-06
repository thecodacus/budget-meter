import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterChartBaseComponent } from './meter-chart-base.component';

describe('MeterChartBaseComponent', () => {
  let component: MeterChartBaseComponent;
  let fixture: ComponentFixture<MeterChartBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeterChartBaseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

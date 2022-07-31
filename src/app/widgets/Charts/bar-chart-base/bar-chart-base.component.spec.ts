import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartBaseComponent } from './bar-chart-base.component';

describe('BarChartBaseComponent', () => {
  let component: BarChartBaseComponent;
  let fixture: ComponentFixture<BarChartBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

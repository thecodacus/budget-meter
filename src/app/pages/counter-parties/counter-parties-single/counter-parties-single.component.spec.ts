import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPartiesSingleComponent } from './counter-parties-single.component';

describe('CounterPartiesSingleComponent', () => {
  let component: CounterPartiesSingleComponent;
  let fixture: ComponentFixture<CounterPartiesSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterPartiesSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterPartiesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

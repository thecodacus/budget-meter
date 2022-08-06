import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetBudgetComponent } from './modal-set-budget.component';

describe('ModalSetBudgetComponent', () => {
  let component: ModalSetBudgetComponent;
  let fixture: ComponentFixture<ModalSetBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

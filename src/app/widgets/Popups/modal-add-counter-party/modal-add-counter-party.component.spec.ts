import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCounterPartyComponent } from './modal-add-counter-party.component';

describe('ModalAddCounterPartyComponent', () => {
  let component: ModalAddCounterPartyComponent;
  let fixture: ComponentFixture<ModalAddCounterPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddCounterPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddCounterPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

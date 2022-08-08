import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalOverlayRef } from 'src/app/lib/modal-overlay';
import { DialogService } from 'src/app/services/dialog.service';
import { StoreService, TransactionType, TransactionCategory } from 'src/app/services/store.service';

@Component({
  selector: 'app-modal-set-budget',
  templateUrl: './modal-set-budget.component.html',
  styleUrls: ['./modal-set-budget.component.scss']
})
export class ModalSetBudgetComponent implements OnInit {
  modalRef: ModalOverlayRef
  budget$: Observable<{ monthly: number }>
  constructor(private dialog: DialogService, private store: StoreService) { }

  ngOnInit(): void {
    this.budget$ = this.store.getBudget()
  }
  openWithTemplate(tpl: TemplateRef<any>) {
    this.modalRef = this.dialog.open(tpl, null)
  }
  close() {
    if (this.modalRef) this.modalRef.close()
  }
  async onSubmit(f: NgForm, success: TemplateRef<any>) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    if (f.valid) {
      await this.store.updateBudget({
        monthly: f.value.amount
      })
      this.close()
      this.modalRef = this.dialog.open(success, null)
    }
  }

}

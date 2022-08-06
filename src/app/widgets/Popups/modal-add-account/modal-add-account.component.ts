import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalOverlayRef } from 'src/app/lib/modal-overlay';
import { DialogService } from 'src/app/services/dialog.service';
import { StoreService, TransactionType, TransactionCategory } from 'src/app/services/store.service';

@Component({
  selector: 'app-modal-add-account',
  templateUrl: './modal-add-account.component.html',
  styleUrls: ['./modal-add-account.component.scss']
})
export class ModalAddAccountComponent implements OnInit {
  modalRef: ModalOverlayRef
  constructor(private dialog: DialogService, private store: StoreService) { }

  ngOnInit(): void {
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
      await this.store.addAccount({
        ...f.value,
        type: "Bank",
        Address: {}
      })
      this.close()
      this.dialog.open(success, null)
    }
  }
}

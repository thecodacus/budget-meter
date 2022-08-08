import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalOverlayRef } from 'src/app/lib/modal-overlay';
import { DialogService } from 'src/app/services/dialog.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-modal-add-counter-party',
  templateUrl: './modal-add-counter-party.component.html',
  styleUrls: ['./modal-add-counter-party.component.scss']
})
export class ModalAddCounterPartyComponent implements OnInit {
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
      await this.store.addCounterParty({
        ...f.value,
      })
      this.close()
      this.modalRef = this.dialog.open(success, null)
    }
  }

}

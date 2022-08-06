import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalOverlayRef } from 'src/app/lib/modal-overlay';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {
  contentType: 'template' | 'string' | 'component' = 'component';
  content: string | TemplateRef<any> | Type<any>;
  context;
  constructor(private ref: ModalOverlayRef) {

  }

  ngOnInit(): void {
    this.content = this.ref.content;
    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }
  close() {
    this.ref.close(null);
  }
  public getTemplateContent(): TemplateRef<any> {
    return this.content as TemplateRef<any>
  }

  public getComponentContent(): Type<any> {
    return this.content as Type<any>
  }

}


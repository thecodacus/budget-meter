import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ModalOverlayRef } from '../lib/modal-overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalBaseComponent } from '../widgets/Popups/modal-base/modal-base.component';

export interface DialogConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private overlay: Overlay, private injector: Injector) { }
  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>, data: T): ModalOverlayRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal-window', 'is-active'],
      backdropClass: 'modal-background'
    });

    const overlayRef = this.overlay.create(configs);
    const modalOverlayRef = new ModalOverlayRef<R, T>(overlayRef, content, data);
    const injector = this.createInjector(modalOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(ModalBaseComponent, null, injector));

    return modalOverlayRef;
  }
  createInjector(ref: ModalOverlayRef, inj: Injector) {
    return Injector.create({
      parent: inj,
      providers: [
        { provide: ModalOverlayRef, useValue: ref }
      ]
    })
  }

}
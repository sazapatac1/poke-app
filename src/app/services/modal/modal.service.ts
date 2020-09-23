import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(component, pokemonId: number) {
    this.modalRef = this.modalService.show(component, {
      initialState: {
        pokemonId: pokemonId,
      },
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}

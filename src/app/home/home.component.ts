import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../services/author.service';
import { TypeaheadComponent } from '../typeahead/typeahead.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[AuthorService],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  @ViewChild(TypeaheadComponent) child_ref_component: TypeaheadComponent | undefined;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  authorSelected(item:any) {
    this.modalService.dismissAll('Data Selected');
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Card} from "@modules/card/card";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
    selector: 'app-card-info',
    templateUrl: './card-info.component.pug',
    styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
    @Input()
    card: Card;

    constructor(public modalRef: BsModalRef) {
    }

    ngOnInit(): void {
    }


}

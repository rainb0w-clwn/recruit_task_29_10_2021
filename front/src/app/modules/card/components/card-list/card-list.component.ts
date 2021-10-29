import {Component, OnInit} from '@angular/core';
import {Card} from "@modules/card/card";
import {CardService} from "@modules/card/card.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {PaginationMeta} from "@shared/interfaces";
import {tap} from "rxjs/operators";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CardInfoComponent} from "@modules/card/components/card-info/card-info.component";

@UntilDestroy()
@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.pug',
    styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
    busy = false;
    cards: Card[];
    cardMeta: PaginationMeta = {pageSize: 4, itemCount: 0, totalItems: 0, totalPages: 0, currentPage: 1};
    modalRef: BsModalRef;

    constructor(private cardService: CardService,
                private route: ActivatedRoute,
                private router: Router,
                private modalService: BsModalService) {
        this.cardMeta.currentPage = this.route.snapshot.queryParams.page ?? this.cardMeta.currentPage;
        this.cardMeta.pageSize = this.route.snapshot.queryParams.size ?? this.cardMeta.pageSize;
    }

    ngOnInit(): void {
        this.busy = true;
        this.cardService.list({
            page: this.cardMeta.currentPage,
            size: this.cardMeta.pageSize
        }).pipe(untilDestroyed(this)).subscribe(answer => {
            this.cards = answer.data;
            this.cardMeta = answer.meta;
            this.busy = false;
        })
    }

    public get canGetMore(): boolean {
        return this.cardMeta.totalPages > this.cardMeta.currentPage
    }

    public getMoreCards() {
        if (!this.canGetMore) {
            return;
        }
        this.busy = true;
        this.cardService.list({
            page: this.cardMeta.currentPage + 1,
            size: this.cardMeta.pageSize
        }).pipe(
            untilDestroyed(this))
            .subscribe(answer => {
                this.cards.push(...answer.data);
                this.cardMeta = answer.meta;
                this.busy = false;
                setTimeout(() => {
                    const element = document.getElementById('card-list');
                    element?.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
                }, 0)
            })
    }

    public openCardInfo(id: number) {
        this.busy = true;
        this.cardService.getCardById(id).subscribe(answer => {
            this.modalRef = this.modalService.show(CardInfoComponent,Object.assign({}, { class: 'modal-lg' }));
            this.busy = false;
            this.modalRef.content.card = answer;
        })
    }


}

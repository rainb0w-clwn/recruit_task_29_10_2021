import {NgModule} from '@angular/core';
import {CardListComponent} from './components/card-list/card-list.component';
import {CardInfoComponent} from './components/card-info/card-info.component';
import {SharedModule} from "@shared/shared.module";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {CardRoutingModule} from "@modules/card/card-routing.module";
import {NgxContentLoadingModule} from "ngx-content-loading";

@NgModule({
    declarations: [CardListComponent, CardInfoComponent],
    imports: [SharedModule,ModalModule, CardRoutingModule, NgxContentLoadingModule],
    providers: [BsModalService]
})
export class CardModule {
}

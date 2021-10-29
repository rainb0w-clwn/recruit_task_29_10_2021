import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardInfoComponent} from "./components/card-info/card-info.component";
import {CardListComponent} from "./components/card-list/card-list.component";

const routes: Routes = [
  {
    path: '',
    component: CardListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRoutingModule {}

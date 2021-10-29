import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/card/card.module').then(m => m.CardModule),
    pathMatch: 'full',
  },
  {
    path: 'card',
    loadChildren: () => import('./modules/card/card.module').then(m => m.CardModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

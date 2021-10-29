import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoaderModule} from './loader/loader.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    LoaderModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    LoaderModule,
  ],
})
export class SharedModule {}

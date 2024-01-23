import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnirseFamiliaPage } from './unirse-familia.page';

const routes: Routes = [
  {
    path: '',
    component: UnirseFamiliaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnirseFamiliaPageRoutingModule {}

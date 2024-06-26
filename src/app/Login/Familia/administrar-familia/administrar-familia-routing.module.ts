import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarFamiliaPage } from './administrar-familia.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarFamiliaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarFamiliaPageRoutingModule {}

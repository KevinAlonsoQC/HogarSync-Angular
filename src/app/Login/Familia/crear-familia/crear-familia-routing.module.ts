import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearFamiliaPage } from './crear-familia.page';

const routes: Routes = [
  {
    path: '',
    component: CrearFamiliaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearFamiliaPageRoutingModule {}

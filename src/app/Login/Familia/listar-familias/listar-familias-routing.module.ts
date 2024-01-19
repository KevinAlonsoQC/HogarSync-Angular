import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarFamiliasPage } from './listar-familias.page';

const routes: Routes = [
  {
    path: '',
    component: ListarFamiliasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarFamiliasPageRoutingModule {}

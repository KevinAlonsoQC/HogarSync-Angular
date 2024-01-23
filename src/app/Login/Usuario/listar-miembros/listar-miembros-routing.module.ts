import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarMiembrosPage } from './listar-miembros.page';

const routes: Routes = [
  {
    path: '',
    component: ListarMiembrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarMiembrosPageRoutingModule {}

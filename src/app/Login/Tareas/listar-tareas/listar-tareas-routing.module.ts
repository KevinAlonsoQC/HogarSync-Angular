import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarTareasPage } from './listar-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: ListarTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarTareasPageRoutingModule {}

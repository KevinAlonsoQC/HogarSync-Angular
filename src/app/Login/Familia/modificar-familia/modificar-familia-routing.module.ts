import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarFamiliaPage } from './modificar-familia.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarFamiliaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarFamiliaPageRoutingModule {}

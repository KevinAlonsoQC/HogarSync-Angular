import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarMiembrosPageRoutingModule } from './listar-miembros-routing.module';

import { ListarMiembrosPage } from './listar-miembros.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarMiembrosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarMiembrosPage]
})
export class ListarMiembrosPageModule {}

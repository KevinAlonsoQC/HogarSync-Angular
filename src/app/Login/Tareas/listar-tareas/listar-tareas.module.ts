import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarTareasPageRoutingModule } from './listar-tareas-routing.module';

import { ListarTareasPage } from './listar-tareas.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarTareasPageRoutingModule,
    HttpClientModule

  ],
  declarations: [ListarTareasPage]
})
export class ListarTareasPageModule {}

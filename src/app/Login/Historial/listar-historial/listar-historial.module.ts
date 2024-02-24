import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarHistorialPageRoutingModule } from './listar-historial-routing.module';

import { ListarHistorialPage } from './listar-historial.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarHistorialPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarHistorialPage]
})
export class ListarHistorialPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarFamiliasPageRoutingModule } from './listar-familias-routing.module';

import { ListarFamiliasPage } from './listar-familias.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarFamiliasPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListarFamiliasPage]
})
export class ListarFamiliasPageModule {}

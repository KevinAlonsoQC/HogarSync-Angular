import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearFamiliaPageRoutingModule } from './crear-familia-routing.module';

import { CrearFamiliaPage } from './crear-familia.page';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearFamiliaPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [CrearFamiliaPage]
})
export class CrearFamiliaPageModule {}

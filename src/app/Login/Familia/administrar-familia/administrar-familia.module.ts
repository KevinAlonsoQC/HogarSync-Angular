import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarFamiliaPageRoutingModule } from './administrar-familia-routing.module';

import { AdministrarFamiliaPage } from './administrar-familia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarFamiliaPageRoutingModule
  ],
  declarations: [AdministrarFamiliaPage]
})
export class AdministrarFamiliaPageModule {}

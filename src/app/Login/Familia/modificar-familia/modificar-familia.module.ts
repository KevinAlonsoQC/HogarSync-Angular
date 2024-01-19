import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarFamiliaPageRoutingModule } from './modificar-familia-routing.module';

import { ModificarFamiliaPage } from './modificar-familia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarFamiliaPageRoutingModule
  ],
  declarations: [ModificarFamiliaPage]
})
export class ModificarFamiliaPageModule {}

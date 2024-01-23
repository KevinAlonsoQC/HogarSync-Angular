import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnirseFamiliaPageRoutingModule } from './unirse-familia-routing.module';

import { UnirseFamiliaPage } from './unirse-familia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnirseFamiliaPageRoutingModule
  ],
  declarations: [UnirseFamiliaPage]
})
export class UnirseFamiliaPageModule {}

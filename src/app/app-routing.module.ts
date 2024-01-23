import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./Login/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./Login/Usuario/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
  {
    path: 'listar-familias',
    loadChildren: () => import('./Login/Familia/listar-familias/listar-familias.module').then( m => m.ListarFamiliasPageModule)
  },
  {
    path: 'administrar-familia/:idFamilia',
    loadChildren: () => import('./Login/Familia/administrar-familia/administrar-familia.module').then( m => m.AdministrarFamiliaPageModule)
  },
  {
    path: 'listar-tareas/:idFamilia',
    loadChildren: () => import('./Login//Tareas/listar-tareas/listar-tareas.module').then( m => m.ListarTareasPageModule)
  },
  {
    path: 'listar-miembros/:idFamilia',
    loadChildren: () => import('./Login/Usuario/listar-miembros/listar-miembros.module').then( m => m.ListarMiembrosPageModule)
  },
  {
    path: 'unirse-familia/:idFamilia/:token',
    loadChildren: () => import('./Login/Usuario/unirse-familia/unirse-familia.module').then( m => m.UnirseFamiliaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
    path: 'crear-familia',
    loadChildren: () => import('./Login/Familia/crear-familia/crear-familia.module').then( m => m.CrearFamiliaPageModule)
  },
  {
    path: 'modificar-familia',
    loadChildren: () => import('./Login/Familia/modificar-familia/modificar-familia.module').then( m => m.ModificarFamiliaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

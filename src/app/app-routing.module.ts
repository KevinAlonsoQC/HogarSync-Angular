import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './Guard/ingresado.guard';
import { NoIngresadoGuard } from './Guard/no-ingresado.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [NoIngresadoGuard]

  },
  {
    path: 'inicio',
    loadChildren: () => import('./Login/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [NoIngresadoGuard]

  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./Login/Usuario/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'listar-familias',
    loadChildren: () => import('./Login/Familia/listar-familias/listar-familias.module').then( m => m.ListarFamiliasPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'administrar-familia/:idFamilia',
    loadChildren: () => import('./Login/Familia/administrar-familia/administrar-familia.module').then( m => m.AdministrarFamiliaPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'listar-tareas/:idFamilia',
    loadChildren: () => import('./Login//Tareas/listar-tareas/listar-tareas.module').then( m => m.ListarTareasPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'listar-miembros/:idFamilia',
    loadChildren: () => import('./Login/Usuario/listar-miembros/listar-miembros.module').then( m => m.ListarMiembrosPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'unirse-familia/:idFamilia/:token',
    loadChildren: () => import('./Login/Usuario/unirse-familia/unirse-familia.module').then( m => m.UnirseFamiliaPageModule),
    canActivate: [IngresadoGuard]

  },
  {
    path: 'listar-historial/:idFamilia',
    loadChildren: () => import('./Login/Historial/listar-historial/listar-historial.module').then( m => m.ListarHistorialPageModule),
    canActivate: [IngresadoGuard]

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

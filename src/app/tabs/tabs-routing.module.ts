import { AuthGuard } from './../auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage, 
    children: [
      {
        path: 'home', 
        loadChildren: () => import('./main-tab/main-tab.module').then(m => m.MainTabPageModule)
      }, 
      {
        path: 'sales',
        loadChildren: () => import('./sales-tab/sales-tab.module').then( m => m.SalesTabPageModule)
      },  
      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      }
    ], 
    canActivate: [AuthGuard]
  }, 
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

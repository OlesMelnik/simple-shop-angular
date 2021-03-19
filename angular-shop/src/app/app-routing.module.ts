import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomePageComponent},
  {path: 'post/:id', component: PostPageComponent},
  {path: 'product/:id', component: ProductPageComponent},
  ]},
  {
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
 ]; 

 @NgModule({
  imports: [RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
 })
 
export class AppRoutingModule { }

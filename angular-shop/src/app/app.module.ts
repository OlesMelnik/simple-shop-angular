import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './admin/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './admin/shared/components/auth.interceptor';
import { AlertComponent } from './admin/shared/components/alert/alert.component';
import { registerLocaleData } from '@angular/common';
import ukLocale from '@angular/common/locales/uk';
import { ProductComponent } from './shared/components/product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { CartComponent } from './user/cart/cart.component';


registerLocaleData(ukLocale, 'uk');

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
 }; 

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    ProductComponent,
    ProductPageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
  ],

  
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

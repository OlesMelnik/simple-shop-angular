import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { CartComponent } from './cart/cart.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { AlertService } from '../admin/shared/components/services/alert.service';
import { RegisterService } from './shared/services/register.service';
import { UserService } from './shared/services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from '../admin/shared/components/alert/alert.component';
@NgModule({
 imports: [
    FormsModule,
    ReactiveFormsModule,   
    CommonModule,
 RouterModule.forChild([
    {path: '', component: UserLayoutComponent, children: [
    {path: '', redirectTo: '/user/login', pathMatch: 'full'},
    {path: 'login', component: UserLoginComponent},
    {path: 'register', component: UserRegisterComponent},
    {path: 'cart', component: CartComponent},
    {path: 'profile', component: ProfileComponent},]}
   ]),   
 ],
 exports: [RouterModule],
 providers: [RegisterService,AlertService, UserService],
 declarations: [UserLayoutComponent, UserLoginComponent, UserRegisterComponent,
    CartComponent, ProfileComponent]
})
export class UserModule { }

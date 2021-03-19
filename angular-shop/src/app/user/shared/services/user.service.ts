import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbCreateresponse, Product, CartProduct, UserAddInfo} from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem("user"));
    }
    currentUser: UserAddInfo;

    setUser(user: UserAddInfo){
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
    }

    getUser(): UserAddInfo{
        return this.currentUser;
    }

    cartProduct: CartProduct;

    getAllUsers(): Observable<UserAddInfo[]> {
        return this.http.get(`${environment.fbDbUrl}/users.json`)
        .pipe(map((respose: {[key: string]: any}) => {
        return Object
        .keys(respose)
        .map(key => ({
        ...respose[key],
        id: key,
        date: new Date(respose[key].date)
        }));
        }));
     }

    deleteUser(){
        this.currentUser = null;
    }

    changeAmount(product: Product): Observable<Product> {
        console.log(this.currentUser.name);
        return this.http.patch<Product>(`${environment.fbDbUrl}/users/${this.currentUser.name}/cart/${product.id}.json`, product);
    }

    saveUser(user: UserAddInfo){
        return this.http.patch<UserAddInfo>(`${environment.fbDbUrl}/users/${this.currentUser.name}.json`,user);
    }

    addToCart(product: Product): Observable<Product>{
        this.cartProduct = product;
        this.cartProduct.amount = 1;
        return this.http.put(`${environment.fbDbUrl}/users/${this.currentUser.name}/cart/${product.id}.json`,
         this.cartProduct)
        .pipe(map((response: FbCreateresponse) => {
        return {
        ...product,
        id: response.name,
        date: new Date(product.date)
        };
        }));
    }

    getAll(): Observable<CartProduct[]> {
        return this.http.get(`${environment.fbDbUrl}/users/${this.currentUser.name}/cart.json`)
        .pipe(map((respose: {[key: string]: any}) => {
        return Object
        .keys(respose)
        .map(key => ({
        ...respose[key],
        id: key,
        date: new Date(respose[key].date)
        }));
        }));
     }

     remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/users/${this.currentUser.name}/cart/${id}.json`);
     }

}
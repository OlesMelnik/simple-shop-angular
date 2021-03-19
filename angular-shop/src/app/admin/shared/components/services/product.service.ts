import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbCreateresponse, Product } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class ProductService {
 constructor(private http: HttpClient) {}
   create(product: Product): Observable<Product> {
    return this.http.post(`${environment.fbDbUrl}/product.json`, product)
    .pipe(map((response: FbCreateresponse) => {
    return {
    ...product,
    id: response.name,
    date: new Date(product.date)
    };
    }));
   }
   getAll(): Observable<Product[]> {
      return this.http.get(`${environment.fbDbUrl}/product.json`)
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
      return this.http.delete<void>(`${environment.fbDbUrl}/product/${id}.json`);
   }

   getById(id: string): Observable<Product> {
      return this.http.get<Product>(`${environment.fbDbUrl}/product/${id}.json`)
      .pipe(map((product: Product) => {
      return {
      ...product,
      id,
      date: new Date(product.date)
      };
      }));
   }
   update(product: Product): Observable<Product> {
      return this.http.patch<Product>(`${environment.fbDbUrl}/product/${product.id}.json`, product);
     }
     
}
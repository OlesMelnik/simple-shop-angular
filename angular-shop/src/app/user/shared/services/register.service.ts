import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, FbCreateresponse } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RegisterService {
 constructor(private http: HttpClient) {}


 create(user: Customer): Observable<Customer> {
    return this.http.post(`${environment.fbDbUrl}/customer.json`, user)
    .pipe(map((response: FbCreateresponse) => {
    return {
    ...user,
    id: user.email,
    date: new Date(user.date)
    };
    }));
}
}

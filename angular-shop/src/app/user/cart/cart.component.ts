import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/admin/shared/components/services/alert.service';
import { CartProduct } from 'src/app/shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  products: CartProduct[] = [];
  pSub: Subscription;
  dSub: Subscription;
  totalPrice: number;
  search = '';
  constructor(private userService: UserService,private alert: AlertService) { }
  ngOnInit(): void {
    this.pSub = this.userService.getAll().subscribe(products => {
    this.products = products;
    this.setTotalPrice();
    console.log(products);
    });
  }

  setTotalPrice(){
    this.totalPrice = 0;
    this.products.forEach((product) => {
      this.totalPrice += parseInt(product.price) * product.amount;
    })
  }

  changeAmount(amount: number,product: CartProduct){
    product.amount = amount;
    this.userService.changeAmount(product).subscribe(() => {});
    this.setTotalPrice();
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    } 
  }
  remove(id: string) {
    this.dSub = this.userService.remove(id).subscribe(() => {
    this.products = this.products.filter(product => product.id !== id);
    this.setTotalPrice();
    this.alert.danger('Продукт був видалений');});
    }
}

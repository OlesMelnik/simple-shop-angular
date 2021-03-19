import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, Product } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/components/services/alert.service';
import { PostService } from '../shared/components/services/post.service';
import { ProductService } from '../shared/components/services/product.service';
@Component({
 selector: 'app-dashboard-page',
 templateUrl: './dashboard-page.component.html',
 styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    products: Product[] = [];
 pSub: Subscription;
 dSub: Subscription;
 search = '';
 constructor(private productService: ProductService,private alert: AlertService) { }
 ngOnInit(): void {
 this.pSub = this.productService.getAll().subscribe(products => {
 this.products = products;
 });
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
  this.dSub = this.productService.remove(id).subscribe(() => {
  this.products = this.products.filter(product => product.id !== id);
  this.alert.danger('Продукт був видалений');
  });
 } 
}
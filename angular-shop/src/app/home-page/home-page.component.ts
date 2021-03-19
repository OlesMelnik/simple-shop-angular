import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../admin/shared/components/services/post.service';
import { ProductService } from '../admin/shared/components/services/product.service';
import { Post, Product } from '../shared/interfaces';
@Component({
 selector: 'app-home-page',
 templateUrl: './home-page.component.html',
 styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
 //posts$: Observable<Post[]>;
 products$: Observable<Product[]>;
 constructor(private productService: ProductService) { }
 ngOnInit(): void {
 this.products$ = this.productService.getAll();
 }
}

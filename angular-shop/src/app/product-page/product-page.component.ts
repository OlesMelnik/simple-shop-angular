import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../admin/shared/components/services/product.service';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product>;
  constructor(
  private route: ActivatedRoute,
  private productsService: ProductService
  ) { }
  ngOnInit(): void {
  this.product$ = this.route.params.
  pipe(switchMap((params: Params) => {
  return this.productsService.getById(params['id']);
  }));
  }

}

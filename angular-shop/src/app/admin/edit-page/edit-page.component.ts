import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../shared/components/services/post.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/components/services/alert.service';
import { Post, Product } from 'src/app/shared/interfaces';
import { ProductService } from '../shared/components/services/product.service';
@Component({
 selector: 'app-edit-page',
 templateUrl: './edit-page.component.html',
 styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: Product;
  submitted = false;
  uSub: Subscription;

 constructor(private route: ActivatedRoute,
 private productService: ProductService,private alert: AlertService) { }
 ngOnInit(): void {
  this.route.params.pipe(
  switchMap((params: Params) => {
  return this.productService.getById(params['id']);
  })
 ).subscribe((product: Product) => {
  this.product = product; 
  this.form = new FormGroup({
  title: new FormControl(product.title, Validators.required),
  text: new FormControl(product.text, Validators.required),
  price: new FormControl(product.price, Validators.required),
  imageSrc: new FormControl(product.imageSrc, Validators.required),
  seller: new FormControl(product.seller, Validators.required),
  });
  });
}
 submit() {
  if (!this.form.valid) {
    return;
    }
    this.submitted = true;
    this.uSub = this.productService.update({
    ...this.product,
    text: this.form.value.text,
    title: this.form.value.title,
    seller: this.form.value.seller,
    price: this.form.value.price,
    imageSrc: this.form.value.imageSrc,
    }).subscribe(() => {
    this.submitted = false;
    this.alert.warning('продукт був відредагований');
    });
 }

 ngOnDestroy(){
  if (this.uSub) {
  this.uSub.unsubscribe();
  }
 }
 
}
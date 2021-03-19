import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post, Product } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/components/services/alert.service';
import { PostService } from '../shared/components/services/post.service';
import { ProductService } from '../shared/components/services/product.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup;
  //constructor(private postsService: PostService,private alert: AlertService) { }
  constructor(private productService: ProductService,private alert: AlertService) { }
  ngOnInit(): void {
    this.form = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required)
    });
    }
    submit() {
      if (this.form.invalid) {
      return;
      }
      // const post: Post = {
      //   title: this.form.value.title,
      //   text: this.form.value.text,
      //   author: this.form.value.author,
      //   date: new Date()
      //   };
      const product: Product = {
        title: this.form.value.title,
        text: this.form.value.text,
        seller: this.form.value.author,
        price: this.form.value.price,
        imageSrc: this.form.value.image,
        date: new Date()
        };
      console.log(product);
      this.productService.create(product).subscribe(() => {
        this.form.reset();
        });
        this.alert.success('Продукт був створений');
  }

}

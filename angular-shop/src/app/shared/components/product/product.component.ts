import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/shared/services/user.service';
import { Product, UserAddInfo } from '../../interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  constructor(private userService: UserService) { }
  user: UserAddInfo;
  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }


  getUser(): UserAddInfo{
    return this.user;
  }

  addToCart(){
    this.userService.addToCart(this.product).subscribe(() => {});
    this.userService.getUser()
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/admin/shared/components/services/auth.service';
import { UserService } from 'src/app/user/shared/services/user.service';
import { UserAddInfo } from '../../interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router,
    private userService: UserService) {}

  user: UserAddInfo;
  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
  }


  getUser(): UserAddInfo{
    return this.user;
  }

  logout(event: Event) {
    //event.preventDefault();
    this.authService.logout();
    localStorage.removeItem('user');
    location.reload();
   }

}

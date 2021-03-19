import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/admin/shared/components/services/alert.service';
import { AuthService } from 'src/app/admin/shared/components/services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router) { }
  ngOnInit(): void {
  }
  logout(event: Event) {
    //event.preventDefault();
    this.authService.logout();
    localStorage.removeItem('user');
   }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/admin/shared/components/services/alert.service';
import { AuthService } from 'src/app/admin/shared/components/services/auth.service';
import { User, UserAddInfo } from 'src/app/shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: FormGroup;
  currentUser: UserAddInfo;
  constructor(private authService: AuthService,private alert: AlertService,
    private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
        email: this.form.value.email,
        password: this.form.value.password
    };

      this.authService.login(user).subscribe(() => {
        this.form.reset();
        this.userService.getAllUsers().subscribe((users) =>{
          console.log(users);
          users.forEach((userInfo) => {
            if(userInfo.email == user.email){
              this.userService.setUser(userInfo);
              console.log(userInfo);
            }
          })
            this.router.navigate(['']);
        })
        },
        () => {
          // this.submitted = false;
          }
        );   
    }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/admin/shared/components/services/alert.service';
import { AuthService } from 'src/app/admin/shared/components/services/auth.service';
import { UserAddInfo } from 'src/app/shared/interfaces';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) {}
  user = this.userService.getUser();
  form: FormGroup;
  newUser: UserAddInfo;

  ngOnInit(): void { 
    this.form = new FormGroup({
    name: new FormControl(this.user.name, Validators.required),
    email: new FormControl(this.user.email, Validators.required),
    phone: new FormControl(this.user.phone, Validators.required),
    photoUrl: new FormControl(this.user.photoUrl, Validators.required),
    age: new FormControl(this.user.age, Validators.required),
    });
  }

  submit(){
    console.log(this.form.value.phone);
    this.newUser = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      photoUrl: this.form.value.photoUrl,
      age: this.form.value.age
    } 
    this.userService.saveUser(this.newUser).subscribe(() => {
      localStorage.setItem("user", JSON.stringify(this.newUser));
    });
  }

}

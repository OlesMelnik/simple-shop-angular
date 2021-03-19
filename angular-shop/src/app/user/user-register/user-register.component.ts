import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/admin/shared/components/services/alert.service';
import { AuthService } from 'src/app/admin/shared/components/services/auth.service';
import { Customer, User, UserAddInfo } from 'src/app/shared/interfaces';
import { RegisterService } from '../shared/services/register.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private authService: AuthService,
    private userService: UserService,
    private alert: AlertService) { }
  ngOnInit(): void {
    this.form = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
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

      const userInfo: UserAddInfo = {
        email: this.form.value.email,
        name: this.form.value.name,
        age: this.form.value.age,
        photoUrl: "https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Nature/H-P/Habitats/Ocean/wave.ngsversion.1500050062134.adapt.710.1.jpg",
        phone: ""
      }
      console.log(user);
      this.authService.registerUser(userInfo).subscribe(() => {
        this.alert.success('User був створений');
        this.userService.setUser(userInfo);
      });
      this.authService.register(user).subscribe(() => {
        this.form.reset();
        });
      }
      
}

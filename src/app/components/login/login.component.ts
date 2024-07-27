import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private shared: SharedService, private snackbar: MatSnackBar, private api: ApiService, private router: Router) {}

  hidePassword = true

  goBack() {
    this.shared.goBack()
  }

  loginForm = new FormGroup({
    idNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  login() {

    if(this.loginForm.invalid) {
      this.snackbar.open(`Please fill in all fields`, 'Ok', {duration: 2000})
      return;
    } else {
    console.log('login',this.loginForm.value);
    const loginData = this.loginForm.value
      this.api.genericPost('/login', loginData).subscribe(
        (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          this.router.navigate(['/home/welcome']); // Navigate to the home page after successful login
          this.snackbar.open(`Login Successful`, 'Ok', { duration: 2000 });
        },
        (error) => {
          this.snackbar.open(`Login Failed: ${error.error}`, 'Ok', { duration: 2000 });
        }
      );

    }

    
  }

  show() {
    this.hidePassword = !this.hidePassword;
  }
}

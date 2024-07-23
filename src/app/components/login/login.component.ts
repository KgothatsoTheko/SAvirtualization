import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private shared: SharedService, private snackbar: MatSnackBar) {}

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

    }

    
  }

  show() {
    this.hidePassword = !this.hidePassword;
  }
}

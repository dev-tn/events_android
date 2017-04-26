import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'

@Component({
    templateUrl: 'app/user/create-user.component.html',
    styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-moz-placeholder {color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class CreateUserComponent {

    loginInvalid = false;
    //TODO: use any of the following to validate email address
    //emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
    //emailPattern = '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/';

    constructor(private router:Router, private authService:AuthService) {
    }

    cancel() {
        this.router.navigate(['/events']);
    }

    saveUser(formValues) {
        this.authService.saveUser(formValues).subscribe(response => {
            this.router.navigate(['events']);
        });
    }
}

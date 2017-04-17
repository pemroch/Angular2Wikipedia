import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent {

    error = '';

    constructor (public af: AngularFire, public router: Router) {}

    onSubmit(loginForm: NgForm) {
        let _this = this;
        _this.af.auth.login({ email: loginForm.value.email, password: loginForm.value.password })
        .then(function(result) {
            _this.router.navigate(['/search']);
        }).catch(function(error) {
            _this.error = error.message;
        })
    }

}
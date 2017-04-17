import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-component',
  templateUrl: './create-account-component.component.html',
  styleUrls: ['./create-account-component.component.css']
})
export class CreateAccountComponentComponent {
    
    error = '';

    constructor (public af: AngularFire, public router: Router) {}

    onSubmit(createAccountForm: NgForm) {
        let _this = this;
        _this.af.auth.createUser({ email: createAccountForm.value.email, password: createAccountForm.value.password })
        .then(function(result) {
            _this.router.navigate(['/search']);
        }).catch(function(error) {
            _this.error = error.message;
        })
    }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  get username() {
    return this.loginForm.value.username;
  }

  get password() {
    return this.loginForm.value.password;
  }

  constructor(private fb: FormBuilder, private rt: Router) { 

    this.loginForm = this.fb.group({
      corporatename: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  
  onChange(event:any) {
    
  }

  ngOnInit(): void {
  }

  getHash32 = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; ++i)
      hash = Math.imul(31, hash) + str.charCodeAt(i)
  
    return hash | 0
  }

  onLogin() {
    //alert("I am clicked login " + this.username + " password " + this.password);
    console.log(this.loginForm.value);
    let value = this.loginForm.get('password')?.value;
    this.loginForm.get('password')?.setValue(this.getHash32(value));
    console.log(this.loginForm.value);

    this.validateDemo() ;
    this.submitDemo();
    this.rt.navigateByUrl('/main');
  }

  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  validateDemo() {
    this.validateBtnState = ClrLoadingState.LOADING;
    //Validating Logic
    this.validateBtnState = ClrLoadingState.SUCCESS;
  }

  submitDemo() {
    this.submitBtnState = ClrLoadingState.LOADING;
    //Submit Logic
    this.submitBtnState = ClrLoadingState.DEFAULT;
  }
}
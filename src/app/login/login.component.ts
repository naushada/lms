import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';

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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  /*
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    type: new FormControl('')
});*/
  
  
  onChange(event:any) {
    
  }
  ngOnInit(): void {
  }


  onLogin() {
    //alert("I am clicked login " + this.username + " password " + this.password);
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

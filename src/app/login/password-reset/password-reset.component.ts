import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  
  passwordResetForm: FormGroup;
  constructor(private http: HttpsvcService, private fb:FormBuilder) { 
    this.passwordResetForm = this.fb.group({
      corporatename:'',
      username: '',
      currentPassword:'',
      newPassword:''
    });
  }

  ngOnInit(): void {
  }

  onPasswordReset() {
    let cname: string  = this.passwordResetForm.get('corporateName')?.value;
    let usrname:string = this.passwordResetForm.get('userName')?.value;
    let cpassword:string = this.passwordResetForm.get('currentPassword')?.value;
    let npassword: string = this.passwordResetForm.get('newPassword')?.value;

  }
}

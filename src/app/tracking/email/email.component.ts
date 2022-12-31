import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Email } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  emailForm: FormGroup
  constructor(private fb: FormBuilder, private http:HttpsvcService) {
    this.emailForm = this.fb.group({
      to: '',
      cc:'',
      bcc:'',
      subject:'',
      emailbody:''
    });
   }

  ngOnInit(): void {
  }

  sendEmail() : void {

    let email: Email = {
      from: "balaagh.technologies@gmail.com", 
      passwd: "htxeootugssowvzl",
      to: this.emailForm.get('to')?.value,
      cc: this.emailForm.get('cc')?.value,
      bcc: this.emailForm.get('bcc')?.value,
      emailbody: this.emailForm.get('emailbody')?.value
    };
    //this.http.initiateEmail(email).subscribe((rsp: any) => {}, error => {}, () => {});
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  emailForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      to: '',
      cc:'',
      bcc:'',
      emailbody:''
    });
   }

  ngOnInit(): void {
  }

  sendEmail() : void {

  }
}

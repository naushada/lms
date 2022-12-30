import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpsvcService) { 
    this.accountForm = this.fb.group({

    });
  }

  ngOnInit(): void {
  }

}

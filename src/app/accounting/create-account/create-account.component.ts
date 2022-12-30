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
      isAccountCodeAutoGen: true,
      loginCredentials: this.fb.group({
      accountCode: '',
      accountPassword: ''}),
      personalInfo: this.fb.group({
        eventLocation:'',
	      role:'',
	      name: '',
	      contact: '',
	      email: '',
	      address: '',
		    city:'',
		    state:'',
		    postalCode:'',
      }),
      customerInfo: this.fb.group({
        companyName:'',
        quotedAmount: '',
        tradingLicense:'',
        vat: '',
        currency:'',
        bankAccountNumber: '',
        iban: ''
      })
    });
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    console.log("AccountInfo Form " + JSON.stringify(this.accountForm.value));
  }

}

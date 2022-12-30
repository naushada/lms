import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, AppGlobals, AppGlobalsDefault } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {

  defVal: AppGlobals = {...AppGlobalsDefault};
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

  retrieveAccountInfo(): void {
    let accCode: string = this.accountForm.get("loginCredentials.accountCode")?.value;
    this.http.getAccountInfo(accCode).subscribe((rsp: Account) => {this.accountForm.setValue({...rsp});}, error => {}, () => {});

  }

  updateAccount(): void {
    let accCode: string = this.accountForm.get("loginCredentials.accountCode")?.value;
    this.http.updateAccountInfo(accCode, this.accountForm.value).subscribe((rsp: any) => {}, error => {}, () => {});
  }
}

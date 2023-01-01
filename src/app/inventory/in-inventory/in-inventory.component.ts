import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';

@Component({
  selector: 'app-in-inventory',
  templateUrl: './in-inventory.component.html',
  styleUrls: ['./in-inventory.component.scss']
})
export class InInventoryComponent implements OnInit {

  acctList: Account[] = [];
  loggedInUser?: Account; 

  createInventoryForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpsvcService, private pubsub:PubsubsvcService) {

    this.createInventoryForm = this.fb.group({
      sku: '',
      productDescription:'',
      qty:'',
      currentDate: '',
      currentTime:'',
      shelf:'',
      rowNumber:'',
      createdBy: '',
      accountCode:''
    });
   }

  ngOnInit(): void {
    this.pubsub.onAccountList.subscribe(
      rsp  => {this.acctList.forEach((elm: Account) => {this.acctList.push(elm)})},
      error => {},
      () => {});

    this.pubsub.onAccount.subscribe(
      rsp => {this.createInventoryForm.get('createdBy')?.setValue(this.loggedInUser?.personalInfo.name);},
      erro =>{}, 
      () => {});  
  }

  createInventory() : void {

  }

}

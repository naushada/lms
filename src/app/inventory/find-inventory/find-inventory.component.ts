import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-find-inventory',
  templateUrl: './find-inventory.component.html',
  styleUrls: ['./find-inventory.component.scss']
})
export class FindInventoryComponent implements OnInit {

  accountInfoList: Account[] = [];

  findInventoryForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpsvcService) {
    this.findInventoryForm = this.fb.group({
      aku:'',
      accountCode:''
    });
   }

  ngOnInit(): void {
    this.http.getAccountInfoList().subscribe(
      (rsp:Account[]) => {rsp.forEach(elm => {this.accountInfoList?.push(elm);});}, 
      error => {}, 
      () => {});
  }

}

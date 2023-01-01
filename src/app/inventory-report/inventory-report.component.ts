import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, AppGlobals, AppGlobalsDefault } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit {

  accountInfoList: Account[] = [];
  inventoryReportForm: FormGroup;
  defVal: AppGlobals;
  constructor(private fb: FormBuilder, private http:HttpsvcService) {
    this.defVal = {...AppGlobalsDefault };
    this.inventoryReportForm = this.fb.group({
      sku:'',
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

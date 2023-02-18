import { Component, OnDestroy, OnInit } from '@angular/core';
import '@cds/core/file/register.js';
import '@cds/core/time/register.js';

import '@cds/core/button/register.js';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelsvcService } from 'src/common/excelsvc.service';
import { Account, ShipmentExcelRow } from 'src/common/app-globals';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit, OnDestroy {

  public loggedInUser?: Account;
  public subsink: SubSink = new SubSink();
  public bulkShipmentForm: FormGroup;
  //public accountInfoList: Map<string, Account > = new Map<string, Account>();
  //public shipmentExcelRows: Array<ShipmentExcelRow> = new Array<ShipmentExcelRow>();


  constructor(private http: HttpsvcService, private fb: FormBuilder, private xls: ExcelsvcService, private subject: PubsubsvcService) {
    this.subsink.sink = this.subject.onAccount.subscribe(rsp => {this.loggedInUser = rsp;},
      error => {},
      () => {});

    this.bulkShipmentForm = this.fb.group({
      excelFileName: ''
    });
  }

  ngOnInit(): void {
  }

  onDownloadTemplate() {
    this.xls.createAndSaveShipmentTemplate("ShipmentTemplate");
  }

  onCreateBulkShipment() {
    alert(this.bulkShipmentForm?.get('excelFileName')?.value);
    
  }

  onFileSelect(event: any) {
    //console.log(event);
    //alert("filename " + event.target.files[0].name + " frmFname " + this.bulkShipmentForm.value.excelFileName);
    //let rows = this.xls.getFromExcel(this.bulkShipmentForm.value.excelFileName);
    let accType:string = this.loggedInUser?.personalInfo.role as string;
    this.xls.processShipmentExcelFile(event, accType);
    this.xls.shipmentExcelRows.forEach(ent => {console.log("AccountCode "+ ent.AccountCode)});
    //console.log("rows "+ this.xls.shipmentExcelRows.at(0)?.AccountCode);
    //console.log("accInfo " + this.xls.accountInfoList);
    this.xls.accountInfoList.forEach(ent => {console.log("AccCode "+ ent.loginCredentials.accountCode)});
  }
  
  ngOnDestroy(): void {
      this.subsink.unsubscribe();
  }
}

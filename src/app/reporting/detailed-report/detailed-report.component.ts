import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, AppGlobals, AppGlobalsDefault, Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {

  defValue: AppGlobals;
  shipments: Shipment[] = [];
  accounts: Account[] = [];
  detailedReportForm: FormGroup;

  constructor(private http:HttpsvcService, private fb: FormBuilder) {
    this.http.getAccountInfoList().subscribe(
      (rsp:Account[]) => { rsp.forEach(elm => {this.accounts?.push(elm);});}, 
      error => {}, 
      () => {});

    this.defValue = {...AppGlobalsDefault};
    this.detailedReportForm = this.fb.group({
      startDate: [formatDate(new Date(Date.now()), 'dd-MM-yyyy', 'en-GB')],
      endDate: [formatDate(new Date(Date.now()), 'dd-MM-yyyy', 'en-GB')],
      receiverCountry: '',
      accountCode:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.shipments = [];
    let sDate:Date = this.detailedReportForm.get('startDate')?.value;
    let eDate:Date = this.detailedReportForm.get('endDate')?.value;
    let acc:string = this.detailedReportForm.get('accountCode')?.value;
    let receiverCountry:string = this.detailedReportForm.get('receiverCountry')?.value

    let accList = new Array<string>();
    if(acc.length > 0) {
      acc = acc.trim();
      accList = acc.split("\n");
    }

    if(acc.length > 0 && receiverCountry.length > 0) {
        this.http.getShipments(sDate, eDate, receiverCountry, accList).subscribe((rsp: Shipment[]) => {
                                    rsp.forEach(elm => {this.shipments.push(elm);})
                                 },
                                 error => {this.shipments = [];alert("No Shipments in this Date Range");},
                                 () => {});

    } else if(receiverCountry.length > 0) {
      this.http.getShipments(sDate, eDate, receiverCountry).subscribe((rsp: Shipment[]) => {
                                  rsp.forEach(elm => {this.shipments.push(elm);})
                               },
                               error => {this.shipments = [];alert("No Shipments in this Date Range");},
                               () => {});

    } else {
      this.http.getShipments(sDate, eDate).subscribe((rsp: Shipment[]) => {
                                rsp.forEach(elm => {this.shipments.push(elm);})
                             },
                             error => {this.shipments = [];alert("No Shipments in this Date Range");},
                             () => {});

    }
  }

  onExcelExport() {

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import {formatDate} from '@angular/common';
import { SubSink } from 'subsink';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  shipmentListForm: FormGroup;
  loggedInUser?: Account;
  subsink = new SubSink();
  shipments: Shipment[] = [];

  constructor(private fb: FormBuilder, private http: HttpsvcService, private subject: PubsubsvcService) {
    this.shipmentListForm = this.fb.group({
      startDate: [formatDate(new Date(Date.now()), 'dd-MM-yyyy', 'en-GB')],
      endDate: [formatDate(new Date(Date.now()), 'dd-MM-yyyy', 'en-GB')],
    });
   }

  ngOnInit(): void {
    this.subsink.sink = this.subject.onAccount.subscribe(rsp => {
      this.loggedInUser = rsp;
    },
      erro => {},
      () => {});
  }

  retrieveShipmentList() {
    if('Customer' == this.loggedInUser?.personalInfo.role) {
      this.http.getShipmentsList(this.shipmentListForm.get('startDate')?.value, 
                                 this.shipmentListForm.get('endDate')?.value,
                                 this.loggedInUser.loginCredentials.accountCode).subscribe((rsp: Shipment[]) => {
                                  rsp.forEach(elm => {this.shipments.push(elm);})
                                 },
                                 error => {alert("No Shipments in this Date Range");},
                                 () => {});
      
    } else {
      this.http.getShipmentsList(this.shipmentListForm.get('startDate')?.value, 
                                 this.shipmentListForm.get('endDate')?.value).subscribe((rsp: Shipment[]) => 
                                 {
                                  //alert(JSON.stringify(rsp));
                                  rsp.forEach(elm => {this.shipments.push(elm);})
                                  //this.shipments = {...rsp};
                                 },
                                 error => {alert("No Shipments in this Date Range");},
                                 () => {});
    }
    
  }

}

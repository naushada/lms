import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import '@cds/core/time/register.js';
import { Account, AppGlobals, AppGlobalsDefault} from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';
import { SubSink } from 'subsink';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-update-shipment',
  templateUrl: './update-shipment.component.html',
  styleUrls: ['./update-shipment.component.scss']
})
export class UpdateShipmentComponent implements OnInit, OnDestroy {

  subsink = new SubSink();
  loggedInUser?: Account;
  updateShipmentStatus: FormGroup;
  defValue?: AppGlobals;

  constructor(private http: HttpsvcService, private subject: PubsubsvcService, private fb: FormBuilder) {

    this.defValue = {...AppGlobalsDefault};
    this.subsink.add(this.subject.onAccount.subscribe(rsp => { this.loggedInUser = rsp;}, (error) => {}, () => {}));
    this.updateShipmentStatus = this.fb.group({
      shipmentNo: '',
      events: '',
      currentDate: [formatDate(new Date(Date.now()), 'dd-MM-yyyy', 'en-GB')],
      currentTime: new Date().getHours() + ':' + new Date().getMinutes(),
      notes:'',
      eventLocation:'',
      manualEventLocation:'',
      driverName:'',
      updatedBy:this.loggedInUser?.personalInfo.name

    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subsink.unsubscribe();
  }
  
  onSubmit() {

  }
}

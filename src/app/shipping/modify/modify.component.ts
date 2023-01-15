import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, AppGlobals, AppGlobalsDefault, Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  defValue?: AppGlobals
  modifyShipmentForm: FormGroup;
  subsink = new SubSink();
  loggedInUser?: Account;
  accounts: Account[] = [];
  isAutoGenerateState: boolean = true;

  constructor(private fb:FormBuilder, private http: HttpsvcService, private subject: PubsubsvcService) {

    this.defValue = {...AppGlobalsDefault };

    this.subsink.sink = this.subject.onAccount.subscribe(rsp => {this.loggedInUser = rsp;},
      error => {},
      () => {});

    this.modifyShipmentForm = this.fb.group({
      isAutoGenerate: this.isAutoGenerateState,
      awbno: '',
      altRefNo: '',
      senderInformation : this.fb.group({
        accountNo: '',
        referenceNo: '',
        name:'',
        companyName:'',
        country: this.defValue.CountryName?.at(1),
        city:'',
        state:'',
        address:'',
        postalCode:'',
        contact:'',
        phoneNumber:'',
        email:'',
        receivingTaxId:''
      }),

      shipmentInformation : this.fb.group({
        activity: this.fb.array([{date: '', 
                                  event: '', 
                                  time: '', 
                                  notes: '', 
                                  driver:'', 
                                  updatedBy: '', 
                                  eventLocation: ''}]),
        skuNo:'',
        service:this.defValue.ServiceType?.at(1),
        numberOfItems:'',
        goodsDescription:'',
        goodsValue:'',
        customsValue:'',
        codAmount:'',
        vat:'',
        currency: this.defValue.Currency?.at(1),
        weight:'',
        weightUnits:'',
        cubicWeight:'',
        createdOn: '',
        createdBy: this.loggedInUser?.personalInfo.name
      }),

      receiverInformation: this.fb.group({
        name:'',
        country:this.defValue.CountryName?.at(1),
        city:'',
        state:'',
        postalCode:'',
        contact:'',
        address:'',
        phone:'',
        email:''
      })

    });

   }

  ngOnInit(): void {
  }

  onShipmentUpdate(){

  }

  retrieveShipment() {
    let awbNo = this.modifyShipmentForm.get('awbno')?.value;
    let altrefno = this.modifyShipmentForm.get('altRefNo')?.value;

    if(awbNo && awbNo.length > 0) {

      this.http.getShipmentByAwbNo(awbNo).subscribe(rsp => {
        // Got the Response 
        alert(JSON.stringify(rsp));
      },

      error => {},

      () => {});

    } else if(altrefno && altrefno.length > 0) {

    }
  }

  onFetchByAwbNo() {

    
  }

  onFetchByAltRefNo() {

    
  }
}

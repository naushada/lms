import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class ModifyComponent implements OnInit, OnDestroy {

  defValue?: AppGlobals
  modifyShipmentForm: FormGroup;
  subsink = new SubSink();
  loggedInUser?: Account;
  shipments: Shipment[] = [];
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
        country: '',
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
        service: '',
        numberOfItems:'',
        goodsDescription:'',
        goodsValue:'',
        customsValue:'',
        codAmount:'',
        vat:'',
        currency: '',
        weight:'',
        weightUnits:'',
        cubicWeight:'',
        createdOn: '',
        createdBy: ''
      }),

      receiverInformation: this.fb.group({
        name:'',
        country:'',
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

  populateFields(rsp: Shipment): void {
    //console.log("Value: " + rsp.shipment.altRefNo);
    //this.modifyShipmentForm.get('altRefNo')?.setValue(rsp.shipment.altRefNo);

    this.modifyShipmentForm.patchValue({
    
    altRefNo: rsp.shipment.altRefNo,  
    senderInformation :
      {
        accountNo:      rsp.shipment.senderInformation.accountNo,
        referenceNo:    rsp.shipment.senderInformation.referenceNo,
        name:           rsp.shipment.senderInformation.name,
        companyName:    rsp.shipment.senderInformation.companyName,
        country:        rsp.shipment.senderInformation.country,
        city:           rsp.shipment.senderInformation.city,
        state:          rsp.shipment.senderInformation.state,
        address:        rsp.shipment.senderInformation.address,
        postalCode:     rsp.shipment.senderInformation.postalCode,
        contact:        rsp.shipment.senderInformation.contact,
        phoneNumber:    rsp.shipment.senderInformation.phoneNumber,
        email:          rsp.shipment.senderInformation.email,
        receivingTaxId: rsp.shipment.senderInformation.receivingTaxId
      },
      shipmentInformation:
        {
          activity:           rsp.shipment.shipmentInformation.activity,
          skuNo:              rsp.shipment.shipmentInformation.skuNo,
          service:            rsp.shipment.shipmentInformation.service,
          numberOfItems:      rsp.shipment.shipmentInformation.numberOfItems,
          goodsDescription:   rsp.shipment.shipmentInformation.goodsDescription,
          goodsValue:         rsp.shipment.shipmentInformation.goodsValue,
          customsValue:       rsp.shipment.shipmentInformation.customsValue,
          codAmount:          rsp.shipment.shipmentInformation.codAmount,
          vat:                rsp.shipment.shipmentInformation.vat,
          currency:           rsp.shipment.shipmentInformation.currency,
          weight:             rsp.shipment.shipmentInformation.weight,
          weightUnits:        rsp.shipment.shipmentInformation.weightUnits,
          cubicWeight:        rsp.shipment.shipmentInformation.cubicWeight,
          createdOn:          rsp.shipment.shipmentInformation.createdOn,
          createdBy:          rsp.shipment.shipmentInformation.createdBy
        },
      receiverInformation: 
          {
            name:       rsp.shipment.receiverInformation.name,
            country:    rsp.shipment.receiverInformation.country,
            city:       rsp.shipment.receiverInformation.city,
            state:      rsp.shipment.receiverInformation.state,
            postalCode: rsp.shipment.receiverInformation.postalCode,
            contact:    rsp.shipment.receiverInformation.contact,
            address:    rsp.shipment.receiverInformation.address,
            phone:      rsp.shipment.receiverInformation.phone,
            email:      rsp.shipment.receiverInformation.email
          }
        });
  }

  retrieveShipment() {

    let awbNo = this.modifyShipmentForm.get('awbno')?.value;
    let altrefno =  '' //this.modifyShipmentForm.get('altRefNo')?.value;

    if(awbNo && awbNo.length > 0) {

      this.http.getShipmentByAwbNo(awbNo).subscribe((rsp: Shipment) => {
        // Got the Response 
        //console.log(JSON.stringify(rsp));
        console.log("Populating Form Field");
        //this.populateFields(rsp);
        this.shipments[0] = rsp;
        //this.modifyShipmentForm.setValue(this.shipments[0].shipment);
        //console.log(this.shipments[0]);
        this.populateFields(this.shipments[0]);

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

  ngOnDestroy(): void {
      this.subsink.unsubscribe();
  }
}

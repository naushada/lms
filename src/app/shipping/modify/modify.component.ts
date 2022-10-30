import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppGlobals, AppGlobalsDefault, Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  retrieveForm: FormGroup;
  senderInfoForm: FormGroup;
  receiverInfoForm: FormGroup;
  shipmentInfoForm: FormGroup;
  defValue?: AppGlobals
  
  constructor(private fb:FormBuilder, private rest: HttpsvcService) {

    this.defValue = {...AppGlobalsDefault };

    this.retrieveForm = this.fb.group({
      awbno: '',
      altRefNo: ''
    });

    this.senderInfoForm = this.fb.group({
      accountNo: '',
      referenceNo: '',
      name:'',
      corporateName:'',
      country: this.defValue.CountryName?.at(1),
      city:'',
      state:'',
      address:'',
      postalCode:'',
      contact:'',
      phoneNumber:'',
      email:'',
      receivingTaxId:''
    });

    this.shipmentInfoForm = this.fb.group({
      skuNo:'',
      service:'',
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
      
    });

    this.receiverInfoForm = this.fb.group({
      name:'',
      country:'',
      city:'',
      state:'',
      postalCode:'',
      contact:'',
      address:'',
      phone:'',
      email:''
    });

   }

  ngOnInit(): void {
  }

  onShipmentUpdate(){

  }

  onFetchByAwbNo() {

    let awbNo: string = this.retrieveForm.get('awbno')?.value;
    alert("the Waybill Number -> " +  awbNo);
    this.rest.getShipmentByAwbNo(awbNo).subscribe((resp: Shipment) => {
      alert("The Address is" + resp.receiverInfo.address);
    }, 
    (error) => {}, 
    () => {alert("This is default");});
  }

  onFetchByAltRefNo() {

    let altRefNo: string = this.retrieveForm.get('altRefNo')?.value;
    this.rest.getShipmentByAltRefNo(altRefNo).subscribe((resp: any) => {}, error => {}, () => {});
  }
}

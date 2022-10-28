import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppGlobals, AppGlobalsDefault } from 'src/common/app-globals';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  senderInformationForm: FormGroup;
  genericForm: FormGroup;
  shipmentInformationForm: FormGroup;
  receiverInformationForm: FormGroup;

  defValue?: AppGlobals;

  constructor(private fb: FormBuilder, private rt:Router) {
    this.defValue = {...AppGlobalsDefault};

    this.genericForm = this.fb.group({
      isAutoGenerate: true,
      awbno: '',
      altRefNo: ''
    });

    this.senderInformationForm = this.fb.group({
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
        });
    this.shipmentInformationForm = this.fb.group({
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
          altRefNo: this.genericForm.get('altRefNo')?.value,
          awbNo: this.genericForm.get('awbno')?.value
        });
  this.receiverInformationForm= this.fb.group({
          name:'',
          country:this.defValue.CountryName?.at(1),
          city:'',
          state:'',
          postalCode:'',
          contact:'',
          address:'',
          phone:'',
          email:''
        });
  }
  
  onShipmentCreate()
  {
      console.log(this.genericForm.value);
      console.log(this.senderInformationForm.value);
      console.log(this.receiverInformationForm.value);
      console.log(this.shipmentInformationForm.value);
      const jjson = {"shipment": {"senderInformation": { ...this.senderInformationForm.value},
                                  "shipmentInformation": { ...this.shipmentInformationForm.value},
                                  "receiverInformation": { ...this.receiverInformationForm.value}
                                },
                    };
      console.log(jjson);
      alert(jjson);
  }

  ngOnInit(): void {
  }

}

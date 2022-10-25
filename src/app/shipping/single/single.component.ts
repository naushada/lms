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

  shipmentForm: FormGroup;
  genericForm: FormGroup;
  defValue?: AppGlobals;

  constructor(private fb: FormBuilder, private rt:Router) {
    this.defValue = {...AppGlobalsDefault};

    this.genericForm = this.fb.group({
      isAutoGenerate: true,
      awbno: '',
      altRefNo: ''
    });

    this.shipmentForm = this.fb.group({
        senderInformation: this.fb.group({
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
        shipmentInformation: this.fb.group({
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
  
  onShipmentCreate()
  {
      console.log(this.shipmentForm.value);
  }

  ngOnInit(): void {
  }

}

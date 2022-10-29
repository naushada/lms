import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppGlobals, AppGlobalsDefault, Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { formatDate } from '@angular/common';

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

  constructor(private fb: FormBuilder, private rt:Router, private rest:HttpsvcService) {
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
          activity: this.fb.array([{date: formatDate(new Date(), 'dd/MM/yyyy', 'en'), event: "Document Created", 
                                    time:new Date().getHours()+':'+new Date().getMinutes(), notes:'Document Ccreated', driver:'', 
                                    updatedBy: '', eventLocation:'Riyadh'}]),
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
          awbNo: this.genericForm.get('awbno')?.value,
          createdOn: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
          createdBy: new Date().getHours()+':'+new Date().getMinutes()
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

      let new_shipment:any = {"shipment": {
                                  "senderInformation":   { ...this.senderInformationForm.value},
                                  "shipmentInformation": { ...this.shipmentInformationForm.value},
                                  "receiverInformation": { ...this.receiverInformationForm.value}
                              }
                    };

      console.log(new_shipment);
      alert(JSON.stringify(new_shipment));
      this.rest.createShipment(JSON.stringify(new_shipment)).subscribe((resp: any) => {alert("Waybill is create successfully for shipment.")},
                                                                       error => {alert("Waybill creation failed");},
                                                                       () => {});
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-single-shipment',
  templateUrl: './single-shipment.component.html',
  styleUrls: ['./single-shipment.component.scss']
})
export class SingleShipmentComponent implements OnInit {

  singleShipmentTrackingForm: FormGroup;
  whichVendor: string = "";

  constructor(private fb: FormBuilder, private http: HttpsvcService) {
    this.singleShipmentTrackingForm = fb.group({
      awbNo: '',
      altRefNo: ''
    }); 
   }

  ngOnInit(): void {
  }

  onVendorSelect(what: string) {
    this.whichVendor = what;
  }

  onSubmit() {
    alert("Value : " + this.singleShipmentTrackingForm.get('awbNo')?.value + " altRefNo: " + this.singleShipmentTrackingForm.get('altRefNo')?.value);
  }
}

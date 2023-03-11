import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-multiple-shipment',
  templateUrl: './multiple-shipment.component.html',
  styleUrls: ['./multiple-shipment.component.scss']
})
export class MultipleShipmentComponent implements OnInit {

  multipleShipmentTrackingForm: FormGroup;
  whichVendor: string = "";
  shipments?: Array<Shipment>;

  constructor(private http: HttpsvcService, private fb: FormBuilder) { 
    this.multipleShipmentTrackingForm = this.fb.group({
      shipmentNo:'',
      altRefNo: '',
      vendor: 'self'
    })
  }

  ngOnInit(): void {
  }

  onVendorSelect(what: string) {
    this.whichVendor = what;
  }

}

import { Component, OnInit } from '@angular/core';
import '@cds/core/file/register.js';
import '@cds/core/time/register.js';

import '@cds/core/button/register.js';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelsvcService } from 'src/common/excelsvc.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit {

  bulkShipmentForm: FormGroup;
  constructor(private http: HttpsvcService, private fb: FormBuilder, private xls: ExcelsvcService) { 
    this.bulkShipmentForm = this.fb.group({
      excelFileName: ''
    });
  }

  ngOnInit(): void {
  }

  onDownloadTemplate() {
    this.xls.createAndSaveShipmentTemplate("ShipmentTemplate");
  }

  onCreateBulkShipment() {
    alert(this.bulkShipmentForm?.get('excelFileName')?.value);
    
  }

  onFileSelect(event: Event) {
    
  }
}

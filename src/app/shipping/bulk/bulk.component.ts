import { Component, OnInit } from '@angular/core';
import '@cds/core/file/register.js';
import '@cds/core/time/register.js';

import '@cds/core/button/register.js';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit {

  bulkShipmentForm: FormGroup;
  constructor(private http: HttpsvcService, private fb: FormBuilder) { 
    this.bulkShipmentForm = this.fb.group({
      excelFileName: ''
    });
  }

  ngOnInit(): void {
  }

  onDownloadTemplate() {

  }

  onCreateBulkShipment() {
    alert(this.bulkShipmentForm?.get('excelFileName')?.value);
  }

  onFileSelect(event: Event) {
    
  }
}

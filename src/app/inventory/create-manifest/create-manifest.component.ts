import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpsvcService } from 'src/common/httpsvc.service';

@Component({
  selector: 'app-create-manifest',
  templateUrl: './create-manifest.component.html',
  styleUrls: ['./create-manifest.component.scss']
})
export class CreateManifestComponent implements OnInit {

  manifestForm:FormGroup;
  constructor(private fb:FormBuilder, private http:HttpsvcService) {
    this.manifestForm = this.fb.group({
      sku: '',
      qty: ''
    });
   }

  ngOnInit(): void {
  }

  createManifest(): void {
    let sku: string = this.manifestForm.get('sku')?.value;
    let qty: number = this.manifestForm.get('qty')?.value;

    alert("sku " + sku + " qty " + qty);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpsvcService } from 'src/common/httpsvc.service';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    //let sku: string = this.manifestForm.get('sku')?.value;
    //let qty: number = this.manifestForm.get('qty')?.value;

    //alert("sku " + sku + " qty " + qty);
    //this.onCreateA2Label;
  }

      
  /** Label A6 Generation  */
  Info = {
    title: 'A2 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'A2 Label for Shipment',
    keywords: 'A2 Label',
  };

  A2LabelContentsBody:Array<object> = new Array<object>();

  buildA2ContentsBody() {

    let sku: string = this.manifestForm.get('sku')?.value;
    let qty: number = this.manifestForm.get('qty')?.value;
    //alert("sku " + sku + " qty " + qty);

    this.A2LabelContentsBody.length = 0;
    for(let idx = 0; idx < qty; ++idx) {
      let ent = [
        {
          table: {
            //headerRows: 0,
            //widths: ['*'],
            //heights: ['auto', 20],
            body: [
              [ {image: this.textToBase64Barcode(sku, 70, 10), fontsize: 10, bold: false, alignment: 'center'}]
            ]
          },
          pageBreak: 'after'
        }
      ];
      this.A2LabelContentsBody.push(ent);
    }
  }

  docDefinitionA2 = {
    info: this.Info,
    pageSize: 'A9',
    //pageMargins: 2,
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    //pageMargins: [ 40, 60, 40, 60 ],
    //pageOrientation: 'portrait',
    content: this.A2LabelContentsBody,
    
  };


  textToBase64Barcode(text: string, ht:number, fSize: number = 15) {
    if(!text.length) {
      text = "default";
    }

    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontOptions: 'bold', fontSize: fSize});
    return canvas.toDataURL("image/png");
  }

  onCreateA2Label() {
    this.buildA2ContentsBody();
    pdfMake.createPdf(this.docDefinitionA2).download( "A2" + "-label");
  }
}

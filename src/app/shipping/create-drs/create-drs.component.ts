import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account, Shipment } from 'src/common/app-globals';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';

import * as JsBarcode from "jsbarcode";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-create-drs',
  templateUrl: './create-drs.component.html',
  styleUrls: ['./create-drs.component.scss']
})
export class CreateDRSComponent implements OnInit {

  createDRSForm: FormGroup;
  shipments: Shipment[] = [];
  whichVendor: string = "";
  loggedInUser?: Account;

  constructor(private fb: FormBuilder, private http: HttpsvcService, private subject:PubsubsvcService) {
    this.createDRSForm = this.fb.group({
      shipmentNo: '',
      altRefNo: '',
      driverName:'',
      vendor:'self'
    })
   }

  ngOnInit(): void {
  }

  onVendorSelect(what: string) {
    this.whichVendor = what;
  }

  onSubmit() {
    this.shipments = [];
    let awbNo = this.createDRSForm.get('shipmentNo')?.value;
    let altRefNo = this.createDRSForm.get('altRefNo')?.value;
    let accCode = this.loggedInUser?.loginCredentials.accountCode;
    let driver = this.createDRSForm.get('driverName')?.value;
    
    let awbList = new Array<string>();

    let senderRefList = new Array<string>();

    if(awbNo.length > 0) {
      awbNo = awbNo.trim();
      awbList = awbNo.split("\n");
      
    } else if(altRefNo.length > 0) {
      altRefNo = altRefNo.trim();
      senderRefList = altRefNo.split("\n");
    }

    if(awbNo != undefined && awbNo.length && this.loggedInUser?.personalInfo.role != "Employee") {
      this.http.getShipmentsByAwbNo(awbList, accCode).subscribe(
        (rsp: Shipment[]) => {
          rsp.forEach((elm: Shipment) => {this.shipments.push(elm)});},
        (error) => {}, 
        () => {this.buildDRS();});

    } else if(awbNo != undefined && awbNo.length) {

      this.http.getShipmentsByAwbNo(awbList).subscribe((rsp:Shipment[]) => {
        rsp.forEach((elm: Shipment) => {this.shipments.push(elm)});
      },

      (error) => {}, 
      () => {this.buildDRS();});

    } else if(altRefNo != undefined && altRefNo.length && this.loggedInUser?.personalInfo.role != "Employee") {
      this.http.getShipmentsByAltRefNo(senderRefList, accCode).subscribe((rsp: Shipment[]) => {
        rsp.forEach((elm: Shipment) => {this.shipments.push(elm)});
      }, 
      (error) => {}, 
      () => {this.buildDRS();});

    } else {

      this.http.getShipmentsByAltRefNo(senderRefList).subscribe(
        (rsp: Shipment[]) => {rsp.forEach((elm: Shipment) => {this.shipments.push(elm)});}, 
        (error) => {}, 
        () => {this.buildDRS();});
    }
  }

  buildDRS() {
    this.onCreateDRS();
  }

  Info = {
    title: 'A4 Label',
    author: 'Mohd Naushad Ahmed',
    subject: 'A4 DRS for Shipment',
    keywords: 'A4 DRS',
  };

  A4LabelContentsBody:Array<object> = new Array<object>();

  buildA4ContentsBody() {
    let idx:number = 0;
    this.A4LabelContentsBody.length = 0;
    this.shipments?.forEach((elm: Shipment) => {
      let ent = [
        {
          table: {
            headerRows: 1,
            //widths: [ 200, '*'],
            body: [
              ['S.No.', 'Sender', 'Receiver', 'Phone No.', 'COD', 'AWB No.', 'Received By'],
              [{text: idx}, {text: elm.shipment.senderInformation.name}, {text: elm.shipment.receiverInformation.address}, {text: elm.shipment.receiverInformation.contact}, {text: elm.shipment.shipmentInformation.codAmount}, {image: this.textToBase64Barcode(elm.shipment.awbno, 70), bold: false, alignment: 'center',rowSpan:1, width: 170}, {} ]
            ]
          },
          pageBreak: 'after'
        }
      ];
      ++idx;
      this.A4LabelContentsBody.push(ent);
    });
  }

  docDefinitionA4 = {
    info: this.Info,
    pageMargins: 10,
    content: this.A4LabelContentsBody,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      rH: {
        height: 100,
        fontSize: 10
      }
    }
  };

  textToBase64Barcode(text: string, ht:number, fSize: number = 15) {
    if(!text.length) {
      text = "default";
    }

    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {format: "CODE128", height: ht, fontOptions: 'bold', fontSize: fSize});
    return canvas.toDataURL("image/png");
  }

  onCreateDRS() {
    this.buildA4ContentsBody();
    pdfMake.createPdf(this.docDefinitionA4).download( "A4" + "-DRS");
  }


}

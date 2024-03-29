import { Component, OnDestroy, OnInit } from '@angular/core';
import '@cds/core/file/register.js';
import '@cds/core/time/register.js';

import '@cds/core/button/register.js';
import { HttpsvcService } from 'src/common/httpsvc.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelsvcService } from 'src/common/excelsvc.service';
import { Account, ShipmentExcelRow } from 'src/common/app-globals';
import { PubsubsvcService } from 'src/common/pubsubsvc.service';
import { formatDate } from '@angular/common';
import { SubSink } from 'subsink';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit, OnDestroy {

  public loggedInUser?: Account;
  public subsink: SubSink = new SubSink();
  public bulkShipmentForm: FormGroup;
  
  public accountInfoList: Map<string, Account > = new Map<string, Account>();
  public shipmentExcelRows?: Array<ShipmentExcelRow> = new Array<ShipmentExcelRow>(); 


  constructor(private http: HttpsvcService, private fb: FormBuilder, private xls: ExcelsvcService, private subject: PubsubsvcService) {
    this.subsink.sink = this.subject.onAccount.subscribe(rsp => {this.loggedInUser = rsp;},
      error => {},
      () => {});

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
    let bulkShipment: Array<string> = [];
    this.shipmentExcelRows?.forEach((ent: ShipmentExcelRow) => {

      let accCode:string = ent.AccountCode;
      let senderInfo = this.accountInfoList.get(ent.AccountCode);

      if(senderInfo != undefined) {

        let shipment:FormGroup = this.fb.group({
          isAutoGenerate: true,
          awbno: '',
          altRefNo: ent.AlternateReferenceNo,

          senderInformation : this.fb.group({
            accountNo: ent.AccountCode,
            referenceNo: ent.ReferenceNo,
            name: ent.SenderName && ent.SenderName || senderInfo.personalInfo.name,
            companyName:senderInfo.customerInfo.companyName,
            country: senderInfo.personalInfo.city,
            city:senderInfo.personalInfo.city,
            state: senderInfo.personalInfo.state,
            address: senderInfo.personalInfo.address,
            postalCode: senderInfo.personalInfo.postalCode,
            contact: senderInfo.personalInfo.contact,
            phoneNumber: senderInfo.personalInfo.contact,
            email: senderInfo.personalInfo.email,
            receivingTaxId: senderInfo.customerInfo.vat
          }),

          shipmentInformation : this.fb.group({
            activity: this.fb.array([{date: formatDate(new Date(), 'dd/MM/yyyy', 'en'), event: "Document Created", 
                                  time:new Date().getHours() + ':' + new Date().getMinutes(), notes:'Document Created', driver:'', 
                                  updatedBy: this.loggedInUser?.personalInfo.name, eventLocation:'Riyadh'}]),
            skuNo:'',
            service:'Non Document',
            numberOfItems: 1,
            goodsDescription: ent.GoodsDescription,
            goodsValue: ent.CustomsValue,
            customsValue:ent.CustomsValue,
            codAmount: ent.CodAmount,
            vat: '',
            currency:ent.CustomsCurrency,
            weight: ent.Weight,
            weightUnits:'KG',
            cubicWeight: '',
            createdOn: formatDate(new Date(), 'dd/MM/yyyy', 'en-GB'),
            createdBy: this.loggedInUser?.personalInfo.name
          }),

          receiverInformation: this.fb.group({
            name: ent.ReceiverName,
            country: ent.ReceiverCity,
            city: ent.ReceiverCity,
            state: ent.ReceiverCity,
            postalCode: '',
            contact: ent.ReceiverPhoneNo,
            address: ent.ReceiverAddress,
            phone: ent.ReceiverAlternatePhoneNo,
            email: ''
         })
      });
      
      let tmpShipment:any = {"shipment": {...shipment.value}};
      bulkShipment.push(tmpShipment);
    }

  });

  if(this.accountInfoList.size) {
    bulkShipment.forEach(elm => {console.log("elm: " + JSON.stringify(elm));});
    this.http.createBulkShipment(JSON.stringify(bulkShipment)).subscribe(rsp => {
      let record: any; 
      let jObj = JSON.stringify(rsp);
      record = JSON.parse(jObj); alert("Shipments Create are: " + record.createdShipments);
    },
    error => {},
    () => {});
  }

  this.accountInfoList.clear();
}


  public getridofDupElement(data: Array<string>) {
    return data.filter((value, idx) => data.indexOf(value) === idx);
  }

  public processShipmentExcelFile(evt: any, accountType: string) {
    let rows: any[] = [];
    let accList: Array<string> = new Array<string>;
    
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(evt.target.files[0]);

    /** This is lamda Funtion = anonymous function */
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      /** wb -- workBook of excel sheet */
      let wb = XLSX.read(binaryData, {type:'binary'});
      
      wb.SheetNames.forEach(sheet => {
        let data = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        rows = <any[]>data;
        for(let idx:number = 0; idx < rows.length; ++idx) {
          
          accList.push(JSON.parse(JSON.stringify(rows.at(idx))).AccountCode);
          this.shipmentExcelRows?.push(new ShipmentExcelRow(rows.at(idx) as ShipmentExcelRow));
        }
      });
    }

    /** This lamda Fn is invoked once excel file is loaded */
    fileReader.onloadend = (event) => {
      if(accountType == "Employee") {
        let uniq: Array<string> = this.getridofDupElement(accList);

        for(let idx: number = 0; idx < uniq.length; ++idx) {
          this.http.getCustomerInfo(uniq[idx]).subscribe(
            (data: Account) => {
              this.accountInfoList.set(data.loginCredentials.accountCode, data);
            },
            (error: any) => {alert("Invalid AccountCode "); },
            () => {}
          );
        }
      } else {
        //this.isBtnDisabled = false;
      }
    }

    fileReader.onerror = (event) => {
      alert("Excel File is invalid: ");
    }
  }

  onFileSelect(event: any) {
    
    let accType:string = this.loggedInUser?.personalInfo.role as string;
    this.processShipmentExcelFile(event, accType);
  }
  
  ngOnDestroy(): void {
      this.subsink.unsubscribe();
  }
}

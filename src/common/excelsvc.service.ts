import { Injectable } from '@angular/core';

//import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as Excel from 'exceljs';
import { AppGlobals, AppGlobalsDefault, ShipmentExcelRow } from './app-globals';

@Injectable({
  providedIn: 'root'
})
export class ExcelsvcService {

  defValue?: AppGlobals;

  constructor() { 
    this.defValue = {...AppGlobalsDefault};

  }

  createAndSaveShipmentTemplate(sheetName: string) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.properties.defaultRowHeight = 20;
    worksheet.properties.defaultColWidth = 20;
    worksheet.pageSetup.paperSize = 9;
    worksheet.pageSetup.orientation = 'landscape';

    worksheet.columns = [
      {header: this.defValue?.ExcelHeading?.at(0), key: this.defValue?.ExcelHeading?.at(0), width: 15},
      {header: this.defValue?.ExcelHeading?.at(1), key: this.defValue?.ExcelHeading?.at(1), width: 15},
      {header: this.defValue?.ExcelHeading?.at(2), key: this.defValue?.ExcelHeading?.at(2), width: 15},
      {header: this.defValue?.ExcelHeading?.at(3), key: this.defValue?.ExcelHeading?.at(3), width: 15},
      {header: this.defValue?.ExcelHeading?.at(4), key: this.defValue?.ExcelHeading?.at(4), width: 15},
      {header: this.defValue?.ExcelHeading?.at(5), key: this.defValue?.ExcelHeading?.at(5), width: 30},
      {header: this.defValue?.ExcelHeading?.at(6), key: this.defValue?.ExcelHeading?.at(6), width: 20},
      {header: this.defValue?.ExcelHeading?.at(7), key: this.defValue?.ExcelHeading?.at(7), width: 30},
      {header: this.defValue?.ExcelHeading?.at(8), key: this.defValue?.ExcelHeading?.at(8), width: 30},
      {header: this.defValue?.ExcelHeading?.at(9), key: this.defValue?.ExcelHeading?.at(9), width: 15},
      {header: this.defValue?.ExcelHeading?.at(10), key: this.defValue?.ExcelHeading?.at(10), width: 20},
      {header: this.defValue?.ExcelHeading?.at(11), key: this.defValue?.ExcelHeading?.at(11), width: 15},
      {header: this.defValue?.ExcelHeading?.at(12), key: this.defValue?.ExcelHeading?.at(12), width: 25},
      {header: this.defValue?.ExcelHeading?.at(13), key: this.defValue?.ExcelHeading?.at(13), width: 15},
    ];
    
    worksheet.views = [
      {state: 'frozen', xSplit: 0, ySplit: 1}
    ];

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ShipmentTemplate.xlsx');
    });

  }

  exportToExcel() {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("data");
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ExportedData.xlsx');
    });
  }

  getFromExcel(fileName: string) {
    let rows: Array<string> = [];

    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fileName).then(() => {
      workbook.eachSheet((sheetName:any, id:any) => {
        let sheet = workbook.getWorksheet(sheetName);
        for(var i = 1; i <= sheet.actualRowCount; i++) {
          rows[i] = JSON.stringify(sheet.getRow(i));
        }
      });
    });
    return(rows);
  }
}

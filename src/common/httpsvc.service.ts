import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, forkJoin, Observable} from 'rxjs';
import { Shipment, Account, ShipmentStatus, Inventory, UriMap, Email, SenderInformation, activityOnShipment } from './app-globals';


@Injectable({
  providedIn: 'root'
})
export class HttpsvcService {

  constructor(private http: HttpClient) { }
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 
  
  /** CREATE Section */
  /**
   * @brief This function retrieves the waybill details based on waybill number.
   * @param awb 
   * @param accountCode 
   * @returns 
   */
  getShipmentByAwbNo(awb: string, accountCode?: string): Observable<Shipment> {
    let param = `awbNo=${awb}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment>("/api/v1/shipment/shipping", options);
  }

  /**
   * 
   * @param altRefNo 
   * @param accountCode 
   * @returns 
   */
  getShipmentByAltRefNo(altRefNo: string, accountCode?: string): Observable<Shipment> {
    let param = `altRefNo=${altRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment>("/api/v1/shipment/shipping", options);
    
  }

  /**
   * 
   * @param senderRefNo 
   * @param accountCode 
   * @returns 
   */
  getShipmentBySenderRefNo(senderRefNo: string, accountCode?: string): Observable<Shipment> {
    let param = `senderRefNo=${senderRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment>("/api/v1/shipment/shipping", options)
  }

  /**
   * 
   * @param fromDate 
   * @param toDate 
   * @param country 
   * @param accountCode 
   * @returns 
   */
  getShipments(fromDate:Date, toDate:Date, country?:string, accountCode?: Array<string>): Observable<Shipment[]> {
    let param = `fromDate=${fromDate}&toDate=${toDate}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    if(country != undefined) {
      param += `&country=${country}`
    }

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment[]>("/api/v1/shipment/shipping", options);
  }


  /**
   * 
   * @param fromDate 
   * @param toDate 
   * @param country 
   * @param accountCode 
   * @returns 
   */
  getShipmentsList(fromDate:Date, toDate:Date, accountCode?: string): Observable<Shipment[]> {
    let param = `fromDate=${fromDate}&toDate=${toDate}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment[]>("/api/v1/shipment/shipping", options)
  }

  /**
   * 
   * @param awb 
   * @param accountCode 
   * @returns 
   */
  getShipmentsByAwbNo(awb: Array<string>, accountCode?: string): Observable<Shipment[]> {
    let param = `awbNo=${awb}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment[]>("/api/v1/shipment/shipping", options)
  }

  /**
   * 
   * @param altRefNo 
   * @param accountCode 
   * @returns 
   */
  getShipmentsByAltRefNo(altRefNo: Array<string>, accountCode?: string): Observable<Shipment[]> {
    let param = `awbNo=${altRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment[]>("/api/v1/shipment/shipping", options)
  }

  /**
   * 
   * @param senderRefNo 
   * @param accountCode 
   * @returns 
   */
  getShipmentsBySenderRefNo(senderRefNo: Array<string>, accountCode?: string): Observable<Shipment[]> {
    let param = `awbNo=${senderRefNo}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }
    
    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Shipment[]>("/api/v1/shipment/shipping", options)
  }

  /**
   * 
   * @param id 
   * @param pwd 
   * @returns 
   */
  getAccountInfo(id:string, pwd?: string): Observable<Account> {
    let param = `userId=${id}`;

    if(pwd && pwd.length > 0) {
      param += `&password=${pwd}`;
    }

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Account>("/api/v1/account/account", options);
  }


  /**
   * 
   * @returns 
   */
  getAccountInfoList(): Observable<Account[]> {
    
     const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Content-Length': '0'
      })
     } 

    return this.http.get<Account[]>("/api/v1/account/account", options);
  }

  /**
   * 
   * @param accountCode 
   * @returns 
   */
  getCustomerInfo(accountCode: string): Observable<Account> {
    let param = `accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Account>("/api/v1/account/account", options);
  }


  getFromInventory(sku: string, acc?: string): Observable<Inventory[]> {
    let param = ``;

    if(sku.length > 0 && acc && acc.length > 0) {
      param = `sku=${sku}&accountCode=${acc}`;
    } else if(acc && acc.length > 0) {
      param = `accountCode=${acc}`;
    } else {
      param = `sku=${sku}`;
    }

    const options = {params: new HttpParams({fromString: param})};

    return this.http.get<Inventory[]>("/api/v1/inventory", options);
  }

  /** UPDATE Section */

  updateInventory(sku:string, qty:number, acc?: string, isUpdate?: string): Observable<any> {
    let param = `sku=${sku}&qty=${qty}`;
    
    if(acc && acc.length) {
      param += `&accountCode=${acc}`;
    }
    if(isUpdate && isUpdate.length) {
      param += `&isUpdate=${isUpdate}`;
    }

    const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    return this.http.put<any>("/api/v1/inventory", JSON.stringify({}), options);
  }


  updateAccountInfo(id:string, accInfo:Account): Observable<any> {
    let param = `userId=${id}`;
    
    const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    return this.http.put<Account>("/api/v1/inventory", JSON.stringify(accInfo), options);
  }

  /**
   * 
   * @param awbNo 
   * @param data 
   * @returns 
   */
  updateShipmentStatus(awbNo: Array<string>, data: ShipmentStatus) : Observable<any> {
    let param = `shipmentNo=${awbNo}`;

    const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    return this.http.put<any>("/api/v1/shipment/shipping", JSON.stringify(data), options);
  }

  /**
   * @brief This method sends multiple request
   * @param awbNo An array of string
   * @param data 
   * @returns Observable <any>
   */
  updateShipmentParallel(awbNo: Array<string>, data: activityOnShipment) : Observable<any> {
    let start = 0;
    let end = awbNo.length;
    let step = 50;
    let reqArr: Array<any> = [];
    
    while(start < end) {
      
      let subArray = awbNo.slice(start, start +=step);
      let param = `shipmentNo=${subArray}`;

      const options = {
                       params: new HttpParams({fromString: param}),
                       headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                        })
                      };
      let req = this.http.put<any>("/api/v1/shipment/shipping", JSON.stringify(data), options);
      reqArr.push(req);
    }
    
    return forkJoin(reqArr);
  }

  /**
   * @brief This method sends multiple request
   * @param awbNo An aero bill of string
   * @param json data 
   * @returns Observable <any>
   */
  updateSingleShipment(awbNo: string, data: string, acc?: string) : Observable<any> {
    let param = "";
    if(acc && acc.length > 0) {
      param = `shipmentNo=${awbNo}&isSingleShipment=true&accountCode=${acc}`;
    } else {
      param = `shipmentNo=${awbNo}&isSingleShipment=true`;
    }
    const options = {
                       params: new HttpParams({fromString: param}),
                       headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                        })
                    };
    return(this.http.put<any>("/api/v1/shipment/shipping", JSON.stringify(data), options));
  }

  /** CREATE Section */
  /**
   * 
   * @param newAccount 
   * @returns 
   */
  createAccount(newAccount:Account) : Observable<Account> {
    return this.http.post<Account>("/api/v1/account/account", JSON.stringify(newAccount), this.httpOptions);
  }

  createInventory(product: Inventory): Observable<any> {

    return this.http.post<Inventory>("/api/v1/inventory", JSON.stringify(product), this.httpOptions);
  }

  //3rd Part Shipment Creation 
  create3rdPartyShipment(awbList:string, uri:string, acc?: string): Observable<any> {
    let param:string = "" ;
    let options:any;

    if(acc && acc.length) {
      param = `&accountCode=${acc}`;
    }

    if(param.length) {
      const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    } else {
      const options = {
        headers: new HttpHeaders({
                 'Content-Type': 'application/json'
         })
       };
    }
    return this.http.post<any>((uri), JSON.stringify(awbList), this.httpOptions);
  }


  /**
   * 
   * @param newShipment 
   * @returns 
   */
   createBulkShipment(newShipment:string) : Observable<any> {
    return this.http.post<Shipment>("/api/v1/shipment/bulk/shipping", 
                                    newShipment, 
                                    this.httpOptions);
  }

  /**
   * 
   * @param newShipment 
   * @returns 
   */
   createShipment(newShipment:any) : Observable<any> {
    return this.http.post<any>("/api/v1/shipment/shipping", 
                                    newShipment, 
                                    this.httpOptions);
  }


  initiateEmail(email: Email): Observable<any> {
    return this.http.post<Email>("/api/v1/email", JSON.stringify(email), this.httpOptions);
  }

}

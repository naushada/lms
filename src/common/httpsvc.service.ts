import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Shipment, Account, ShipmentStatus, Inventory, UriMap } from './app-globals';

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

  //private apiURL:string = 'https://ajoul.herokuapp.com';
  //private apiURL:string = 'https://apigw-l7rsmphepa-uc.a.run.app';
  
  private apiURL:string = 'http://localhost:8080';
  //private apiURL:string = 'https://balaagh.herokuapp.com';
  //private apiURL:string = 'https://gwx.herokuapp.com';
  //private apiURL:string = 'https://xapp-cpkpi52p2q-uc.a.run.app';
  //private apiURL: string = 'https://xpmile.herokuapp.com'
  //apiURL = 'https://xpmile-wphbm7seyq-uc.a.run.app';
  
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

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment>(uri, options)
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

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment>(uri, options)
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

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment>(uri, options)
  }

  /**
   * 
   * @param fromDate 
   * @param toDate 
   * @param country 
   * @param accountCode 
   * @returns 
   */
  getShipments(fromDate:string, toDate:string, country?:string, accountCode?: Array<string>): Observable<Shipment[]> {
    let param = `fromDate=${fromDate}&toDate=${toDate}`;

    if(accountCode != undefined) {
      param += `&accountCode=${accountCode}`
    }

    if(country != undefined) {
      param += `&country=${country}`
    }

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment[]>(uri, options)
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

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment[]>(uri, options)
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

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment[]>(uri, options)
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

    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.get<Shipment[]>(uri, options)
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

    let uri: string = this.apiURL + UriMap.get("from_web_account");
    return this.http.get<Account>(uri, options);
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

    let uri: string = this.apiURL + UriMap.get("from_web_account");
    return this.http.get<Account[]>(uri, options);
  }

  /**
   * 
   * @param accountCode 
   * @returns 
   */
  getCustomerInfo(accountCode: string): Observable<Account> {
    let param = `accountCode=${accountCode}`;

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + UriMap.get("from_web_account");
    return this.http.get<Account>(uri, options);
  }


  getFromInventory(sku: string, acc?: string): Observable<Inventory[]> {
    let param = `sku=${sku}`;

    if(acc && acc.length > 0) {
      param += `accountCode=${acc}`;
    }

    const options = {params: new HttpParams({fromString: param})};

    let uri: string = this.apiURL + UriMap.get("from_web_manifest");
    return this.http.get<Inventory[]>(uri, options);
  }

  /** UPDATE Section */

  updateInventory(sku:string, qty:number, acc?: string): Observable<any> {
    let param = `sku=${sku}&qty=${qty}`;
    
    if(acc && acc.length) {
      param += `&accountCode=${acc}`;
    }

    const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    let uri: string = this.apiURL + UriMap.get("from_web_manifest");
    return this.http.put<any>(uri, JSON.stringify({}), options);
  }


  updateAccountInfo(id:string, accInfo:Account): Observable<any> {
    let param = `userId=${id}`;
    
    const options = {
                     params: new HttpParams({fromString: param}),
                     headers: new HttpHeaders({
                              'Content-Type': 'application/json'
                      })
                    };
    let uri: string = this.apiURL + UriMap.get("from_web_manifest");
    return this.http.put<Account>(uri, JSON.stringify(accInfo), options);
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
    let uri: string = this.apiURL + UriMap.get("from_web_shipment");
    return this.http.put<any>(uri, JSON.stringify(data), options);
  }

  /**
   * @brief This method sends multiple request
   * @param awbNo An array of string
   * @param data 
   * @returns Observable <any>
   */
  updateShipmentParallel(awbNo: Array<string>, data: ShipmentStatus) : Observable<any> {
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
      let uri: string = this.apiURL + UriMap.get("from_web_shipment");
      let req = this.http.put<any>(uri, JSON.stringify(data), options);
      reqArr.push(req);
    }
    
    return forkJoin(reqArr);
  }

  /** CREATE Section */
  /**
   * 
   * @param newAccount 
   * @returns 
   */
  createAccount(newAccount:Account) : Observable<Account> {
    return this.http.post<Account>(this.apiURL + UriMap.get("from_web_account"), JSON.stringify(newAccount), this.httpOptions);
  }

  createInventory(product: Inventory): Observable<any> {

    return this.http.post<Account>(this.apiURL + UriMap.get("from_web_manifest"), JSON.stringify(product), this.httpOptions);
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
    //let uri: string = this.apiURL + '/api/manifest';
    return this.http.post<any>((this.apiURL + uri), JSON.stringify(awbList), this.httpOptions);
  }


  /**
   * 
   * @param newShipment 
   * @returns 
   */
   createBulkShipment(newShipment:string) : Observable<any> {
    return this.http.post<Shipment>(this.apiURL + UriMap.get("from_web_bulk_shipment"), 
                                    newShipment, 
                                    this.httpOptions);
  }

  /**
   * 
   * @param newShipment 
   * @returns 
   */
   createShipment(newShipment:any) : Observable<any> {
    return this.http.post<any>(this.apiURL + UriMap.get("from_web_shipment"), 
                                    newShipment, 
                                    this.httpOptions);
  }
}

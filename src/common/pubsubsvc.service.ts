import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Account } from './app-globals';

@Injectable({
  providedIn: 'root'
})
export class PubsubsvcService {

  private acctInst?: Account;
  private acctbs$ = new  BehaviorSubject(this.acctInst);
  private acctListInst?: Array<Account>;
  private acctListbs$ = new  BehaviorSubject(this.acctListInst);

  constructor() { }

  /** onAccount will be used to subscribe for AccountInfo of logged in user */
  public onAccount = this.acctbs$.asObservable();
  public onAccountList = this.acctListbs$.asObservable();

  /** This will be used to publish account info to subscriber */
  public emit_accountInfo(acct: Account) {
    this.acctbs$.next(acct);
    this.acctInst = acct;
  }

  /** This will be used to publish account info to subscriber */
  public emit_accountListInfo(acct: Array<Account>) {
    this.acctListbs$.next(acct);
    this.acctListInst = acct;
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() selectedNavItem: string = "";
  private selectedItem: string = "";

  constructor() { }

  ngOnInit(): void {
    this.onMenuSelect('shipping');
    this.onReceiveEvt('singleShipment');
  }

  public onMenuSelect(opt: string) {
    this.selectedMenuItem = opt;
  }

  public get selectedMenuItem(): string {
    return(this.selectedItem);
  }

  public set selectedMenuItem(item:string) {
    this.selectedItem = item;
  }

  public onReceiveEvt(navItem:any):void {
    this.selectedNavItem = navItem;
  }
}

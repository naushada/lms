import { Component, OnInit } from '@angular/core';
import '@cds/core/file/register.js';
import '@cds/core/time/register.js';

import '@cds/core/button/register.js';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

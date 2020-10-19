import { Component, OnInit } from '@angular/core';
import { ItemService } from './shared/item.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers:[ItemService]
})
export class StockComponent implements OnInit {

  constructor(private itemService : ItemService) { }

  ngOnInit() {
  }

}

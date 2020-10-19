import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/item.service';
import {Item} from '../shared/item.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  itemList : Item[];
  constructor(private itemService : ItemService) { }

  ngOnInit() {
    var x = this.itemService.getData();
    x.snapshotChanges().subscribe(item => {
      this.itemList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.itemList.push(y as Item);
      });
    });
  }

  onEdit(itm : Item){
    this.itemService.selectedItem = Object.assign({},itm);
  }

  onDelete(key : string){
    if (confirm('Are you sure to delete this record ?') == true) {
    this.itemService.deleteItem(key);
  }
}
}

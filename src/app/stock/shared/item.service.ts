import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemList: AngularFireList<any>;
  selectedItem: Item = new Item();

  constructor(private firebase :AngularFireDatabase) { }

  getData(){
    this.itemList = this.firebase.list('items');
    return this.itemList;
  }

  insertItem(item : Item)
  {
    this.itemList.push({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    });
  }

  updateItem(item : Item){
    this.itemList.update(item.$key,
      {
        name: item.name,
        quantity: item.quantity,
        price: item.price
      });
  }

  deleteItem($key : string){
    this.itemList.remove($key);
  }


}

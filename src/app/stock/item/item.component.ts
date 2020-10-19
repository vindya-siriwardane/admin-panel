import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from '../shared/item.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  title = 'Alert Success'
  constructor(private itemService : ItemService, private toastrService : ToastrService) { }

  ngOnInit() {
    // this.itemService.getData();
    this.resetForm();
  }

  onSubmit(itemForm : NgForm){
    if(itemForm.value.$key == null)
    this.itemService.insertItem(itemForm.value);
    else
    this.itemService.updateItem(itemForm.value);
    this.resetForm(itemForm);
    // this.tostr.success('Added successfully', 'Item');
  }

  resetForm(itemForm? : NgForm){
    if (itemForm != null)
      itemForm.reset();
    this.itemService.selectedItem = {
      $key: null,
      name: '',
      quantity: 0,
      price: 0,
    }

  }

  alert(){
    this.toastrService.success('Success !!', 'title');
  }
}

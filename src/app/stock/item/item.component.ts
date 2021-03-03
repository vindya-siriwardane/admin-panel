import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  itemList: Item[];
  public code : string;

  constructor(public itemService: ItemService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.itemService.getData().subscribe(actionArray => {
      this.itemList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Item
        };
      })

    });

  }

  onSubmit(itemForm: NgForm) {
    if (document.getElementById("otherCategoryId").style.display == "flex") { 
      let data = Object.assign({}, itemForm.value);
      console.log(data);
      data.category = data.otherCategory;
      delete data.id;
      if (itemForm.value.id == null)
        this.firestore.collection('items').add(data);
      else
        this.firestore.doc('items/' + itemForm.value.id).update(data);
      this.resetForm(itemForm);
      this.toastr.success('Successfully added to the stock ! ', 'Stock Update');
    } 
    else 
    {
      let data = Object.assign({}, itemForm.value);
      delete data.id;
      // delete data.code;

      if (itemForm.value.id == null && itemForm.value.code)
        this.firestore.collection('items').add(data);
      else
        this.firestore.doc('items/' + itemForm.value.id).update(data);
      
        this.resetForm(itemForm);
      this.toastr.success('Successfully added to the stock ! ', 'Stock Update');
    }


  }


  resetForm(itemForm?: NgForm) {
    if (itemForm != null)
      itemForm.reset();
    this.itemService.formData = {
      id: null,
      code: '',
      category: '',
      otherCategory: '',
      name: '',
      quantity: 0,
      price: 0,
    }

  }

  // getCategory(code) {
  //   if (!code) {
  //     console.log("nothing here");

  //   }
  //   else {

  //     console.log(code);
  //     var itemName = (<HTMLInputElement>document.getElementById("name"))
  //     itemName.focus();
  //   }
  // }
  onOtherCategory(event: { target: { value: any; }; }) {
    const otherCategory = event.target.value;

    if (otherCategory == "Other") {
      document.getElementById("otherCategoryId").setAttribute("style", "display: flex");
      document.getElementById("otherCategoryIdLabel").setAttribute("style", "display: flex");

    }
    else {
      document.getElementById("otherCategoryId").setAttribute("style", "display: none");
      document.getElementById("otherCategoryIdLabel").setAttribute("style", "display: none");
    }
  }
}

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
  public itemList1: string[];
  public tempData: any[] = [];

  public code: string;
  public count: number;
  public bool: boolean = false;
  public bool2: boolean = false;
  public docID: string;

  constructor(public itemService: ItemService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.resetForm();

    var itemList1: string[] = [];
    var categoryCheck: string;
    var count2: number;
    var count3: number = 1;
    var categoryBool: boolean = false;

    this.itemService.getData().subscribe(actionArray => {
      this.itemList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Item
        };
      })
      console.log("item list ", this.itemList)

      for (let i = 0; i < this.itemList.length; i++) {
        let name = this.itemList[i].category;
        let aext = this.tempData.find((dataX) => dataX.category === name)
        if (aext == undefined) {
          let data = {
            "category": this.itemList[i].category
          }
          this.tempData.push(data);
        } else { }
      }
      itemList1[0] = this.itemList[0].category;
      for (this.count = 1; this.count < this.itemList.length; this.count++) {
        categoryCheck = this.itemList[this.count].category;
        for (count2 = 0; count2 < itemList1.length; count2++) {
          if (itemList1[count2] == categoryCheck) {
            categoryBool = true;
          } else { }
        }
        if (categoryBool == false) {
          itemList1[count3] = categoryCheck;
          count3++;
        } else { }
        this.bool = false;
      }
    });
    this.itemList1=[];
    this.itemList1 = this.tempData;
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
    else {
      let data = Object.assign({}, itemForm.value);
      delete data.id;
      this.itemService.getData().subscribe(actionArray => {
        this.itemList = actionArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as Item
          };
        })

      });


      for (this.count = 0; this.count < this.itemList.length; this.count++) {
        if (this.itemList[this.count].code == data.code && this.itemList[this.count].category == data.category) {
          this.firestore.doc('items/' + this.itemList[this.count].id).update(data);
          this.toastr.success('Successfully updated to the stock ! ', 'Stock Update');
          this.bool = true;
          break;
        }

      }
      if (this.bool == false) {
        this.firestore.collection('items').add(data);
        this.toastr.success('Successfully added to the stock ! ', 'Stock Update');


      }
      this.resetForm(itemForm);
      this.bool = false;
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

  onOtherCategory(event: { target: { value: any; }; }) {
    const otherCategory = event.target.value;

    if (otherCategory == "OTHER") {
      document.getElementById("otherCategoryId").setAttribute("style", "display: flex");
      document.getElementById("otherCategoryIdLabel").setAttribute("style", "display: flex");

    }
    else {
      document.getElementById("otherCategoryId").setAttribute("style", "display: none");
      document.getElementById("otherCategoryIdLabel").setAttribute("style", "display: none");
    }
  }
}

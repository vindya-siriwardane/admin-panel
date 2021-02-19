import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/shared/item.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public itemService : ItemService, 
    private firestore : AngularFirestore,
    private toastr : ToastrService ) { }

  ngOnInit(){
    this.resetForm();
  }

  onSubmit(itemForm : NgForm){
    let data = Object.assign({},itemForm.value) ;
    delete data.id;
    if(itemForm.value.id == null)
      this.firestore.collection('items').add(data);
    else
    this.firestore.doc('items/' + itemForm.value.id).update(data);  
      this.resetForm(itemForm);
      this.toastr.success('Successfully submitted ! ','Item Register');
    
  }


  resetForm(itemForm? : NgForm){
    if (itemForm != null)
      itemForm.reset();
    this.itemService.formData = {
      id: null,
      name: '',
      quantity: 0,
      price: 0,
    }

  }
}

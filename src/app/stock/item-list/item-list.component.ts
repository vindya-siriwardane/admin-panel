import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemList : Item[];
  constructor(private itemService : ItemService, private firestore : AngularFirestore,private toastr : ToastrService) { }

  ngOnInit(){
    this.itemService.getData().subscribe(actionArray =>{
      this.itemList = actionArray.map(item =>{
        return {id:item.payload.doc.id,
          ...item.payload.doc.data()as Item};
      })

    });  
  }
  
  onEdit(item: Item) {
    
    this.itemService.formData = Object.assign({},item);
    
  }

  onDelete(id: string) {
    if(confirm("Are sure to delete this record ? ")){
      this.firestore.doc('items/' + id).delete(); 
      this.toastr.warning('Deleted successfully ! ', 'Delete item');
    }
  }

}

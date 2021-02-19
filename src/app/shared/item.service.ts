import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  formData  : Item;

  constructor(private firestore: AngularFirestore) { }

  getData() {
    return this.firestore.collection('items').snapshotChanges();
  }
}


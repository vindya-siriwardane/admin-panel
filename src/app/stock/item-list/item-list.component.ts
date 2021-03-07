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

  itemList: Item[];
  link: string;
  public myAngularxQrCode: any[] = null;
  code: string;

  constructor(private itemService: ItemService, private firestore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.itemService.getData().subscribe(actionArray => {
      this.itemList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Item
        };
      })

    });
  }

  onEdit(item: Item) {

    this.itemService.formData = Object.assign({}, item);

  }

  generateQR(item: Item) {
    this.code = item.code;
    this.myAngularxQrCode = [item.code, ',', item.name, ',', item.price.toString(), ',', item.quantity.toString(), ',', item.expDate.toString(), ','
      , item.discount.toString(), ',', item.weight];
  }

  qrDownload(parent) {
    const parentElement = parent.el.nativeElement.querySelector("img").src;
    let blobData = this.convertBase64ToBlob(parentElement);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, this.code);
      this.download();
    } else {
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = this.code;
      link.click();
    }
  }
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  download() {
    const qrcode = document.getElementById('qrcode') as HTMLElement;
    let imageData = this.getBase64Image(qrcode.firstChild.firstChild);
    const link = document.createElement('a');
    link.href = imageData;
    link.download = this.code;
    link.click();
  }

  private convertBase64ToBlob(Base64Image: any) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  onDelete(id: string) {
    if (confirm("Are sure to delete this record ? ")) {
      this.firestore.doc('items/' + id).delete();
      this.toastr.warning('Deleted successfully ! ', 'Delete item');
    }
  }

}

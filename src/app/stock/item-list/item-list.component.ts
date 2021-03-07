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
  // public myAngularxQrCode[]:;
  public myAngularxQrCode: any[] = [];

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

  downloadQR(item: Item) {

    // this.itemService.formData = Object.assign({},item);
    // console.log("items exp date.. ",item.expDate);
    this.myAngularxQrCode = [item.code, ',', item.name, ',', item.price.toString(), ',', item.quantity.toString(), ',', item.expDate.toString(), ','
      , item.discount.toString(), ',', item.weight];
    console.log("myAngular ... ", this.myAngularxQrCode);
    const fileNameToDownload = 'image_qrcode';
    const base64Img = document.getElementsByClassName('img-responsive')[0]['src'];

    // fetch(base64Img)
    //   .then(res => res.blob())
    //   .then((blob) => {
    //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //       window.navigator.msSaveOrOpenBlob(blob, fileNameToDownload);
    //     }
    //     else {
    //       const url = window.URL.createObjectURL(blob);
    //       const link = document.createElement('a');
    //       // const link = base64Img.src;
    //       link.href = url;
    //       console.log(url);
    //       link.download = fileNameToDownload;
    //       link.click();
    //     }
    //   })
    // var y = document.getElementsByTagName("img")[5];
    // console.log("y...",y)
    // this.link = y.src;

    // console.log("QR .. ", this.itemService.formData);

  }

  qrDownload(parent) {
    const parentElement = parent.el.nativeElement.querySelector("img").src;
    let blobData = this.convertBase64ToBlob(parentElement);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
      window.navigator.msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { 
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
     
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }
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
// export class QRCodeComponent {
//     public myAngularxQrCode: string = null;
//     constructor () {
//       // assign a value
//       this.myAngularxQrCode = 'Your QR code data string';
//     }
//   }

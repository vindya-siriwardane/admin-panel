import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';


import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { StockComponent } from './stock/stock.component';
import { ItemComponent } from './stock/item/item.component';
import { ItemListComponent } from './stock/item-list/item-list.component';
import { ItemService } from './shared/item.service';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    ItemComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    QRCodeModule,
    ToastrModule.forRoot()

  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }

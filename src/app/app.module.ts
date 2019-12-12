import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import {MatInputModule, MatCardModule} from '@angular/material';
import { AppComponent } from './app.component';
import { MatTableModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatGridTile, MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { DataTablesModule } from 'angular-datatables';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "487819488610-kn94d2og4t7aocfdkj9qaplif9dqvtb4.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    DataTablesModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatExpansionModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
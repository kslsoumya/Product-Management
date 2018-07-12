import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AngularFontAwesomeModule} from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    ViewProductsComponent,
    NotfoundComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'addProduct/:username', component: AddProductComponent },
      { path: 'view/:username', component: ViewProductsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotfoundComponent }

    ])
  ],
  exports : [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

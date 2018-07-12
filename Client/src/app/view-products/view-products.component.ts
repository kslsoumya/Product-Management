import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  public products;
  public username;
  public isEditable;
  public isHidden;
  public isChanged = false;
  public expiry;
  public title;
  public stock;


  constructor(private httpService: HttpService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.httpService.viewProducts(this.username).subscribe(
      (data) => {
        this.products = data['data'];
        console.log(this.products);
        console.log(data['message']);
      }
    );
  }
  public editProduct = (product) => {
    product.edit = true;
    this.isHidden = true;
    this.expiry = product.expiry;
    this.stock = product.stock;
    this.title = product.title;
  }

  public cancelEdit = (product) => {
    product.edit = false;
  }

  public saveProduct = (product) => {
    product.edit = false;

    if (this.expiry && this.stock && this.title) {
      const newProduct = {
        code: product.code,
        expiry: this.expiry,
        stock: this.stock,
        title: this.title
      };
      console.log(newProduct);
      this.httpService.updateProduct(newProduct).subscribe(
        (data) => {
          if (data['status'] === 200) {
            this.toastr.success('Product Edited Successfully!!');
            this.httpService.viewProducts(this.username).subscribe(
              (values) => {
                this.products = values['data'];
                this.isChanged = true;
                console.log(this.products);
                console.log(values['message']);
              }
            );
          } else if (data['status'] === 404) {
            this.toastr.warning('Product Not Found Try Again!!');
          }
        },
        (err) => {
          this.toastr.error('Some Error Occured!!');

        });
    }
  }


  public deleteProduct = (product) => {
    this.httpService.deleteProduct(product).subscribe(
      (data) => {
        if (data['status'] === 200) {
          this.toastr.success('Product Deleted Successfully!!');
          this.httpService.viewProducts(this.username).subscribe(
            (values) => {
              this.products = values['data'];
              this.isChanged = true;
              console.log(this.products);
              console.log(values['message']);
            }
          );
        } else if (data['status'] === 404) {
          this.toastr.warning('ProductNot Found Try Again!!');
        }
      },
      (err) => {
        this.toastr.error('Some Error Occured!!');
      });
  }
}

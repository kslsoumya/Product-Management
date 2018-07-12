import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public username;
  public productName;
  public stock;
  public expDate;
  public code;


  constructor(private route: ActivatedRoute, private httpService: HttpService, private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {
    this.code = Math.floor(Math.random() * 999) + 100;
    this.username = this.route.snapshot.paramMap.get('username');
  }
  public generateProduct = () => {
    const product = {
      username: this.username,
      title: this.productName,
      code: this.code,
      stock: this.stock,
      expiry: this.expDate
    };
    this.httpService.addProduct(product).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Product Added Successfully!!');
        this._router.navigate(['/view/' + this.username]);
      },
      (err) => {
        console.log(err);
        this.toastr.error('Some Error Occured!!');

      }
    );

  }

}

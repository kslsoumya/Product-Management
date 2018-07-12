import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userName: string;
  public password: String;
  public emailId: String;
  public mobile: Number;
  public dob: Date;

  constructor(private httpService: HttpService , private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {
  }

  public createUser: any = () => {
    const newUser = {
      username: this.userName,
      password: this.password,
      emailId: this.emailId,
      mobile: this.mobile,
      dob: this.dob,
    };
    this.httpService.signUp(newUser).subscribe(
      (response) => {
        if (response['status'] === 200) {
        this.toastr.success('User Created successfully!!');
        setTimeout(() => {
          this._router.navigate(['/home']);
        });
        } else if (response['status'] === 500) {
          this.toastr.warning('UserName or Email already Exists!!');
        }
        console.log(response);
    },
      (err) => {
        console.log(err.message);
        this.toastr.error('Some Error Occured!!');
      }
    );
  }
}

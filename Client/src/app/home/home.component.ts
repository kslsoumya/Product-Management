import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userName: String;
  public password: String;

  constructor(private httpService: HttpService, private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {

  }
  public loginUser: any = () => {
    const userData = {
      username : this.userName,
      password : this.password
    };
    this.httpService.loginUser(userData).subscribe(
      (response) => {
        console.log(response);
        if (response['status'] === 200 ) {
          this.toastr.success('Logged In Successfully!!');
          setTimeout(() => {
            this._router.navigate(['/view', userData.username]);
          });

        } else if (response['status'] === 404) {
          this.toastr.warning('User Not Registered');
        } else {
          this.toastr.warning('Wrong UserName or Password');
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error('Some Error Occured!!');
      });
  }
}

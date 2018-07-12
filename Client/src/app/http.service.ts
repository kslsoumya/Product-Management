import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public signUp = (userData) => {
    return this.http.post('api/v1/signup', userData);
  }

  public loginUser = (userData) => {
    return this.http.get(`api/v1/login/${userData.username}/${userData.password}`);
  }

  public viewProducts = (userName) => {
    return this.http.get(`api/v1/view/${userName}`);
  }

  public addProduct = (product) => {
    return this.http.post(`api/v1/add_product`, product);
  }
  public deleteProduct = (product) => {
    return this.http.post(`api/v1/delete_product`, product);
  }

  public updateProduct = (product) => {
    return this.http.put(`api/v1/update_product`, product);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductById(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProduct(product:any):Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(id:number, product: any):Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id:number):Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

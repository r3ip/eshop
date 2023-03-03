import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products'; 

@Injectable({
  providedIn: 'root'
})
export class StoreApiService {

  private path = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) { }

  getProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.path);
  }

  getById(id: number):Observable<Products>{
    return this.http.get<Products>(`${this.path}/${id}`);
  }

  getCategories():Observable<string[]>{
    return this.http.get<string[]>(`${this.path}/categories`);
  }

  getByCategory(category: string):Observable<Products[]>{
    console.log(`${this.path}/${category}`)
    return this.http.get<Products[]>(`${this.path}/category/${category}`);
  }
}

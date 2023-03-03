import { Component } from '@angular/core';
import { Products } from 'src/app/shared/models/products';
import { StoreApiService } from 'src/app/shared/services/store-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: Products[];
  categories: string[];

  constructor(
    private storeApiService :StoreApiService
  ){}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts('');
  }

  getCategories(){
    this.storeApiService.getCategories().subscribe({
      next: (res) => this.categories = res,
      error: (err) => console.log(err)
    })
  }

  getProducts(category: string){
    if(category !== '') {
      this.storeApiService.getByCategory(category).subscribe({
        next: (res) => this.products = res,
        error: (err) => console.log(err)
      })
    } else {
      this.storeApiService.getProducts().subscribe({
        next: (res) => this.products = res,
        error: (err) => console.log(err)
      })
    }
  }

  captureCategory(category: string){
    this.getProducts(category);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/shared/models/products';
import { StoreApiService } from 'src/app/shared/services/store-api.service';
import { CounterService } from 'src/app/shared/services/counter.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product: Products

  constructor(
    private storeApiService :StoreApiService,
    private counterService: CounterService,
    private storageService: StorageService,
    private toast: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.valideId()
  }

  valideId(){
    this.activatedRoute.params.subscribe({
      next: (res) => {
        const id = parseInt(res['id']);
        this.getById(id);
      },
      error: (err) => this.router.navigate(['/products'])
    })
  }

  getById(id: number){
    this.storeApiService.getById(id).subscribe({
      next: (res) => this.product = res,
      error: (err) => console.log(err)
    })
  }
  
  addCartShopping() {
    let products = this.storageService.getData('products');
    if (products) {

      let prod = products.find(x => x.id === this.product.id)

      if (!prod) {
        const obj = {
          count: 1,
          ...this.product
        }
        
        products.push(obj);

        this.storageService.setData('products', products);
      } else {
        products.forEach(element => {
          if (element.id === this.product.id) {
            element.count += 1;
            this.storageService.setData('products', products);
          }
        });
      }
    } else {
      const obj = {
        count: 1,
        ...this.product
      }
      this.storageService.setData('products', [obj]);
    }
    this.counterService.addCounter.emit();
    this.successToast(`${this.product.title} added to shopping cart`)
  }

  successToast(mensaje: string){
    this.toast.success(mensaje)
  }
}

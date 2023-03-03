import { Component, Input } from '@angular/core';
import { Products } from 'src/app/shared/models/products';
import { CounterService } from 'src/app/shared/services/counter.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product: Products;
  
  constructor(
    private counterService: CounterService,
    private storageService: StorageService,
    private toast: ToastrService
    ){}

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

  errorToast(mensaje: string){
    this.toast.error(mensaje)
  }
}

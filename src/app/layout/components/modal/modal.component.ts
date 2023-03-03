import { Component, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { CounterService } from 'src/app/shared/services/counter.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() id: number;
  @Input() badges: number;

  products: any[];
  disable: boolean = true;
  total: string = '0';

  constructor(
    private storegeService: StorageService,
    private counterService: CounterService,
    private toast: ToastrService
    ){}

  getDataStorage(){
    this.products = this.storegeService.getData('products');
    if(this.products) this.calTotal(this.products);
  }

  calTotal(products: any[]){

      let total = 0;
      products.forEach(element => {
        let count = element.count;
        let price = element.price;

        total += (count * price);
      });

      this.total = total.toFixed(2)
      if(total > 0) {
        this.disable = false
      } else {
        this.disable = true
      };
  }

  deleteItemStorage(id:number){
    let products = this.storegeService.getData('products');
    let productFilter = products.filter(x => x.id != id)
    this.storegeService.setData('products', productFilter)

    this.successToast('product deleted to shopping cart');
    this.counterService.subtractCounter.emit();
    this.getDataStorage();
  }

  buy(){
    this.infoToast('thanks for your buying!');
    this.hideModal();
    this.storegeService.removeData('products')
    this.counterService.subtractCounter.emit();
  }

  showModal(){
    this.getDataStorage();
  }

  hideModal(){
    document.getElementById("close").click();
  }

  successToast(mensaje: string){
    this.toast.success(mensaje)
  }

  infoToast(mensaje: string){
    this.toast.info(mensaje)
  }
}

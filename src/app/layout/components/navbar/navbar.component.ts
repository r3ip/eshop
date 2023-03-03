import { Component } from '@angular/core';
import { CounterService } from 'src/app/shared/services/counter.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  badges: number = 0;

  constructor(
    private counterService: CounterService,
    private storageService: StorageService){}
  
  ngOnInit(): void {

    this.init();
    
    this.counterService.addCounter.subscribe(
      (counter) => {
        this.init();
    })

    this.counterService.subtractCounter.subscribe(

      (counter) => {
        this.init();
    })
  }

  init() {
    const products = this.storageService.getData('products')
    let count = 0;
    if(products){
      products.forEach(element => {
        count += element.count
      });
    }
    this.badges = count;
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { CategoriesComponent } from './products/categories/categories.component';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout.component';


@NgModule({
  declarations: [
    ProductsComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    ModalComponent,
    CategoriesComponent,
    ProductComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }

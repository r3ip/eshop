import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() categories: string[];

  @Output()
  event = new EventEmitter<string>() 

  sendCategory(event: any){
    this.event.emit(event.target.value);
  }
}
